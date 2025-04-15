export enum Auth0Tenant {
    DEFAULT = 'Default',
    ENTERPRISE = 'Enterprise',
}

export enum Auth0Database {
    TALENT = 'talent-database',
    CONSOLE = 'console-database',
    RESELLER = 'reseller-database',
    CANDIDATE = 'Username-Password-Authentication',
}

export enum Auth0ErrorMessage {
    FAILED_GET_TOKEN = 'Error while trying to obtain access token from auth0',
    FAILED_GET_USER = 'Error while trying to get user details from auth0',
    FAILED_CREATE_USER = 'Error while trying to create user on auth0',
    FAILED_UPDATE_USER = 'Error while trying to update user data on auth0',
    FAILED_UPDATE_USER_APP_METADATA = 'Error while trying to update user app_metadata on auth0',
    FAILED_UPDATE_USER_USER_METADATA = 'Error while trying to update user user_metadata on auth0',
    FAILED_DELETE_USER = 'Error while trying to delete user data on auth0',
    FAILED_CREATE_CHANGE_PASSWORD_TICKET = 'Error while trying to password change ticket on auth0',
    FAILED_SEND_EMAIL_VERIFICATION = 'Error while trying to send email verification on auth0',
}

export interface IAuth0Config {
    audience: string;
    clientId?: string;
    clientSecret?: string;
    domain: string;
    iss: string;
}