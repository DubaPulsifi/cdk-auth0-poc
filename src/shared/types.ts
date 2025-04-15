import { CreateUserData } from "auth0";
import { Company } from "../entity";
import { Auth0Tenant, WebApp } from "./constants";

export interface ICreateAuth0UserDto {
    data: CreateUserData;
    tenant: Auth0Tenant;
    company: Company;
  }

  export type WebAppUrl = Record<WebApp, string>;

  export interface SqsConfig {
    apiVersion: string;
    region: string;
    queueUrl: string;
}
export interface SnsConfig {
    apiVersion: string;
    region: string;
    topic: string;
}
export interface S3Config {
    apiVersion: string;
    bucketName: string;
    region: string;
    pulsifiDomain?: string;
}
