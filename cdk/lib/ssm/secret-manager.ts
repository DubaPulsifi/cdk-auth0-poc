import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { awsConfig } from '../../../src/shared/config';

const client = new SecretsManagerClient({ region: awsConfig.region });
const secretCache = new Map<string, any>();

export const getSecret = async <T>(secretId: string): Promise<T> => {
  if (secretCache.has(secretId)) {
    return secretCache.get(secretId) as T;
  }

  try {
    const { SecretString } = await client.send(
      new GetSecretValueCommand({ SecretId: secretId }),
    );

    if (!SecretString) {
      throw new Error(`No secret string found for ${secretId}`);
    }

    const parsedSecret = JSON.parse(SecretString) as T;
    secretCache.set(secretId, parsedSecret);

    return parsedSecret;
  } catch (error: any) {
    console.error(`Failed to fetch secret ${secretId}:`, error);
    throw error;
  }
};
