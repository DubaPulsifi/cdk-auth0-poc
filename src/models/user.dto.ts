import { CreateUserData } from "auth0";
import { Auth0Tenant } from "../shared";
import { Company } from "../entity";

export interface ICreateAuth0UserDto {
  data: CreateUserData;
  tenant: Auth0Tenant;
  company: Company;
}

export interface IUpdateUserDto {
  userAccountId: number;
  auth0Id: string;
  email: string;
  picture: string;
}

export interface IUserInviteEmailOptions {
  companyId: number;
  companyName: string;
}
