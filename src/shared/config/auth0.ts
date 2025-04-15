
import { IAuth0Config } from "../constants";
import { getDomainName } from "../utils";

const auth0Enterprise: IAuth0Config = {
    audience: `${process.env.AUTH0_ENTERPRISE_MANAGEMENT_AUDIENCE}`,
    domain: getDomainName(process.env.AUTH0_ENTERPRISE_DOMAIN as string),
    clientId: process.env.AUTH0_ENTERPRISE_M2M_CLIENT_ID,
    clientSecret: process.env.AUTH0_ENTERPRISE_M2M_CLIENT_SECRET,
    iss: `${process.env.AUTH0_ENTERPRISE_DOMAIN}`,
};

const auth0Default: IAuth0Config = {
    audience: `${process.env.AUTH0_MANAGEMENT_AUDIENCE}`,
    domain: getDomainName(process.env.AUTH0_DOMAIN as string),
    clientId: process.env.AUTH0_M2M_CLIENT_ID,
    clientSecret: process.env.AUTH0_M2M_CLIENT_SECRET,
    iss: `${process.env.AUTH0_DOMAIN}`,
};

// const auth0Enterprise: IAuth0Config = {
//     audience: envUtil.get('AUTH0_ENTERPRISE_MANAGEMENT_AUDIENCE'), // `${process.env.AUTH0_ENTERPRISE_MANAGEMENT_AUDIENCE}`,
//     domain: getDomainName(envUtil.get('AUTH0_ENTERPRISE_DOMAIN')), // getDomainName(process.env.AUTH0_ENTERPRISE_DOMAIN as string),),
//     clientId: envUtil.get('AUTH0_ENTERPRISE_M2M_CLIENT_ID'), // process.env.AUTH0_ENTERPRISE_M2M_CLIENT_ID,
//     clientSecret: envUtil.get('AUTH0_ENTERPRISE_M2M_CLIENT_SECRET'), // process.env.AUTH0_ENTERPRISE_M2M_CLIENT_SECRET,
//     iss: envUtil.get('AUTH0_ENTERPRISE_DOMAIN'), // `${process.env.AUTH0_ENTERPRISE_DOMAIN}`,
// };

// const auth0Default: IAuth0Config = {
//     audience: envUtil.get('AUTH0_MANAGEMENT_AUDIENCE'), // `${process.env.AUTH0_MANAGEMENT_AUDIENCE}`,
//     domain: getDomainName(envUtil.get('AUTH0_DOMAIN')), // getDomainName(process.env.AUTH0_DOMAIN as string),
//     clientId: envUtil.get('AUTH0_M2M_CLIENT_ID'), // process.env.AUTH0_M2M_CLIENT_ID,
//     clientSecret: envUtil.get('AUTH0_M2M_CLIENT_SECRET'), // process.env.AUTH0_M2M_CLIENT_SECRET,
//     iss: envUtil.get('AUTH0_DOMAIN'), // `${process.env.AUTH0_DOMAIN}`,
// };

export const auth0Config: Record<string, IAuth0Config> = {
    default: auth0Default,
    enterprise: auth0Enterprise,
};