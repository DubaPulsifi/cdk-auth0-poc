import { Repository } from "typeorm";
import { IUpdateUserDto, IUserInviteEmailOptions } from "../models";
import {
  createPasswordChangeTicketUrl,
  getManagementClient,
} from "./auth.service";
import { sqsService } from "@pulsifi/fn/services/sqs.service";
import {
  EmailActivityMessageRecipientGroup,
  EmailRequest,
  TemplateVariable,
} from "@pulsifi/fn/interfaces";
import {
  EmailTemplateCommunicationType,
  Auth0Tenant,
  WebApp,
  WebAppToApplicationIdMappings,
} from "../shared";
import { awsConfig, webAppUrlConfig } from "../shared/config";
import { getDataSource } from "../database";
import { UserAccount, UserInvitation } from "../entity";

export const updateUser = async (updateData: IUpdateUserDto) => {
  const dataSource = await getDataSource();

  const userRepo: Repository<UserAccount> =
    dataSource.getRepository(UserAccount);

  const updatedUser = await userRepo.save({
    id: updateData.userAccountId,
    ext_user_id: updateData.auth0Id,
    picture_url: updateData.picture,
  });

  return userRepo.findOneOrFail({
    where: {
      id: updateData.userAccountId,
    },
  });
};

const getSsoUserInviteLinkVariable = (
  email: string,
  webApp: WebApp,
  webAppUrl: string,
  invitationId?: string
): Partial<TemplateVariable> => {
  if (!invitationId) {
    throw new Error("Invitation id must not be empty!");
  }

  const inviteRoute = webApp === WebApp.CONSOLE ? "" : "/login";

  return {
    invite_link: `${webAppUrl}${inviteRoute}/?invitationId=${invitationId}&email=${email}&type=invite`,
  };
};

const getAuth0UserInviteLinkVariable = async (
  webAppUrl: string,
  auth0Tenant: Auth0Tenant,
  auth0UserId?: string
): Promise<Partial<TemplateVariable>> => {
  if (!auth0UserId) {
    throw new Error("External auth0 user id must not be empty!");
  }

  const url = await createPasswordChangeTicketUrl(
    auth0UserId,
    webAppUrl,
    auth0Tenant
  );

  return { set_password_link: `${url}&type=invite` };
};

const getUserInvitationByAppId = async (
  userAccountId: number,
  appId: number
) => {
  const dataSource = await getDataSource();
  const userInviteRepo: Repository<UserInvitation> =
    dataSource.getRepository(UserInvitation);

  return userInviteRepo
    .createQueryBuilder("ui")
    .leftJoinAndSelect("ui.user_account", "user_account")
    .where("user_account.id = :userAccountId", { userAccountId })
    .andWhere("ui.app_id = :appId", { appId })
    .andWhere("ui.accepted_at IS NULL")
    .getOne();
};

export const getEmailTemplateType = (
  app: WebApp,
  isSso: boolean
): EmailTemplateCommunicationType => {
  switch (true) {
    case app === WebApp.CONSOLE && isSso:
      return EmailTemplateCommunicationType.CONSOLE_ACCOUNT_INVITATION;

    case app === WebApp.CONSOLE && !isSso:
      return EmailTemplateCommunicationType.CONSOLE_WELCOME_ACCOUNT;

    case app === WebApp.EMPLOYEE && isSso:
      return EmailTemplateCommunicationType.EMPLOYEE_ACCOUNT_INVITATION;

    case app === WebApp.EMPLOYEE && !isSso:
      return EmailTemplateCommunicationType.EMPLOYEE_WELCOME_ACCOUNT;

    case isSso:
      return EmailTemplateCommunicationType.ACCOUNT_INVITATION;

    default:
      return EmailTemplateCommunicationType.WELCOME_ACCOUNT;
  }
};

export const mapEmailRequest = (
  companyId: number,
  companyName: string,
  userAccount: UserAccount,
  emailCommunicationType: EmailTemplateCommunicationType,
  linkVariable: Partial<TemplateVariable>
): EmailRequest => ({
  recipient_email: userAccount.email,
  recipient_group: EmailActivityMessageRecipientGroup.USER,
  recipient_id: userAccount.id.toString(),
  company_id: companyId,
  email_communication_type: emailCommunicationType,
  variables: {
    ...linkVariable,
    first_name: userAccount.first_name,
    last_name: userAccount.last_name,
    email: userAccount.email,
    company_name: companyName,
  },
});

export const sendInvite = async (
  userAccount: UserAccount,
  inviteEmailTemplateType: EmailTemplateCommunicationType,
  linkVariable: Partial<TemplateVariable>,
  options: IUserInviteEmailOptions
) => {
  const emailRequest = mapEmailRequest(
    options.companyId,
    options.companyName,
    userAccount,
    inviteEmailTemplateType,
    linkVariable
  );

  await sqsService.send(emailRequest, awsConfig.sqs);
};

export const sendUserInviteEmail = async (
  app: WebApp,
  userAccount: UserAccount,
  options: IUserInviteEmailOptions
): Promise<void> => {
  const webAppUrl = webAppUrlConfig[app];

  const userInvite = await getUserInvitationByAppId(
    userAccount.id,
    WebAppToApplicationIdMappings[app]
  );

  if (!userInvite) {
    throw new Error("User invitation not found!");
  }

  const emailTemplateType = getEmailTemplateType(
    app,
    userAccount.is_connection_sso
  );

  const isConnectionSso = !!userAccount.is_connection_sso;

  const templateVariable = isConnectionSso
    ? getSsoUserInviteLinkVariable(
        userAccount.email,
        app,
        webAppUrl,
        userInvite.id
      )
    : await getAuth0UserInviteLinkVariable(
        webAppUrl,
        Auth0Tenant.ENTERPRISE,
        userAccount.ext_user_id
      );

  await sendInvite(userAccount, emailTemplateType, templateVariable, options);
};
