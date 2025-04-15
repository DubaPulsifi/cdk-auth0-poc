import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';
import { awsConfig } from '../../../src/shared/config';

const client = new SSMClient({ region: awsConfig.region });

export const getStringValue = async (
  paramName: string,
  withDecryption = false,
): Promise<string> => {
  try {
    const command = new GetParameterCommand({
      Name: paramName,
      WithDecryption: withDecryption,
    });

    const { Parameter } = await client.send(command);

    if (!Parameter?.Value) {
      const message = `SSM parameter "${paramName}" returned no value.`;
      console.error(message);
      throw new Error(message);
    }

    return Parameter.Value;
  } catch (error: any) {
    console.error(`Failed to fetch SSM parameter "${paramName}":`, error);
    throw error;
  }
};
