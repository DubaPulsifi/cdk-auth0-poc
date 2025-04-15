
import { Auth0UserDto } from "../models";
import { AuthenticationClient, CreateUserData, ManagementClient } from "auth0";
import { Auth0Tenant, IAuth0Config } from "../shared";
import { auth0Config } from "../shared/config";

const getAuth0Config = (tenant: Auth0Tenant): IAuth0Config => {
    return auth0Config[tenant.toLocaleLowerCase()];
}

const getAccessToken = async (tenant: Auth0Tenant): Promise<string> => {
    // const cacheKey = generatorUtil.cacheKey(
    //     CacheObject.AUTH0_ACCESS_TOKEN,
    //     tenant,
    // );

    let token; // await this.cacheService.get<TokenResponse>(cacheKey);
    // if (token) {
    //     return token.access_token;
    // }

    const auth0Config = getAuth0Config(tenant);
    const client = new AuthenticationClient({
        domain: auth0Config.domain,
        clientId: auth0Config.clientId as string,
        clientSecret: auth0Config.clientSecret,
    });

    try {
        token = await client.clientCredentialsGrant({
            audience: auth0Config.audience,
        });

        // await this.cacheService.set<TokenResponse>(
        //     cacheKey,
        //     token,
        //     token.expires_in * 1000, // to milliseconds
        // );

        return token.access_token;
    } catch (error) {
        throw error;
    }
}

export const getManagementClient = async  (
    tenant: Auth0Tenant,
): Promise<ManagementClient> => {
    const config = getAuth0Config(tenant);
    const token = await getAccessToken(tenant);

    return new ManagementClient({
        token,
        domain: config.domain,
    });
}

export const createAuth0User = async (
    dto: CreateUserData,
    tenant: Auth0Tenant,
): Promise<Auth0UserDto> => {
    const client = await getManagementClient(tenant);

    try {
        const response = await client.createUser(dto);

        return response;
    } catch (error) {
        throw error;
    }
}

export const createPasswordChangeTicketUrl = async (
    auth0UserId: string,
    callbackUrl: string,
    tenant: Auth0Tenant,
): Promise<string> => {
    const client = await getManagementClient(tenant);

    try {
        const response = await client.createPasswordChangeTicket({
            result_url: callbackUrl,
            user_id: auth0UserId,
            ttl_sec: 60 * 60 * 24 * 7, // 7 days in seconds
            mark_email_as_verified: true,
        });

        return response.ticket.replace(/#$/g, '');
    } catch (error) {
        throw error;
    }
}