import { CreateUserData } from "auth0";
import { Company } from "../entity";
import { Auth0Tenant, WebApp } from "./constants";

export interface ICreateAuth0UserDto {
    data: CreateUserData;
    tenant: Auth0Tenant;
    company: Company;
  }

  export type WebAppUrl = Record<WebApp, string>;