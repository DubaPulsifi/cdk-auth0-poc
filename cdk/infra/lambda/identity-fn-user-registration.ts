import { SQSEvent } from "aws-lambda";
import { ICreateAuth0UserDto, WebApp } from "../../../src/shared";
import {
  createAuth0User,
  sendUserInviteEmail,
  updateUser,
} from "../../../src/services";

export const handler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    try {
      console.log("Message:", record.body);
      const rawString = record.body.replace(/\\/g, ""); // Remove escape characters
      const cleanString = rawString.replace(/^"(.*)"$/, "$1"); // Remove surrounding quotes
      console.log(cleanString);

      // Your processing logic here
      const payload: ICreateAuth0UserDto = JSON.parse(cleanString);
      console.log("Decoded Payload: ", payload);

      const auth0User = await createAuth0User(payload.data, payload.tenant);
      const updatedUser = await updateUser({
        auth0Id: auth0User.user_id as string,
        userAccountId: parseInt(payload.data.app_metadata?.user_account_id),
        email: payload.data.email as string,
        picture: payload.data.picture as string,
      });

      console.log("Created Auth0 User:", auth0User);

      await sendUserInviteEmail(WebApp.TALENT, updatedUser, {
        companyId: payload.company.id,
        companyName: payload.company.name,
      });
    } catch (error) {
      console.error("Error processing message:", error);
      throw error; // Will return message to queue
    }
  }
};
