import { Signer, type SignerConfig } from '@aws-sdk/rds-signer';


const getRdsSignerAuthToken = async (params: SignerConfig): Promise<string> => {
  console.info('Getting RDS signer auth token', params);

  try {
    const signer = new Signer(params);
    const token = await signer.getAuthToken();

    return token;
  } catch (error) {
    console.error(`Failed to getAuthToken ${params}:`);

    throw error;
  }
};

export const rdsTokenClient = {
  getRdsSignerAuthToken,
};
