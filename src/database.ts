import "reflect-metadata"

import { DataSource } from 'typeorm';

import { DbSecret } from "./shared";
import { awsConfig } from "./shared/config";
import { ENTITIES } from "./entity";
import { getSecret } from "../cdk/lib/ssm";
import { rdsTokenClient } from "./shared/utils/rds-signer";

let dataSource: DataSource | null = null;
let tokenExpiry = 0;
let cachedDbSecret: DbSecret | null = null;

const TOKEN_REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes

const getDBSecrets = async (): Promise<DbSecret> => {
  if (!cachedDbSecret) {
    try {
      cachedDbSecret = await getSecret<DbSecret>(process.env.SM_NAME as string);
    } catch (error) {
      console.error('Error fetching DB secrets', { error });
      throw new Error(`Failed to fetch DB secrets: ${error}`);
    }
  }
  return cachedDbSecret;
};

const getDBAuthToken = async (
  hostname: string,
  port: number,
  username: string,
): Promise<string> => {
  const authToken = await rdsTokenClient.getRdsSignerAuthToken({
    region: awsConfig.region,
    hostname,
    port,
    username,
  });

  tokenExpiry = Date.now() + TOKEN_REFRESH_INTERVAL;
  return authToken;
};

const getDatabaseCertificateString = async (dbSecret: DbSecret) => {
  try {
    return dbSecret.dbCaCert.replace(/\\n/g, '\n');
  } catch (error) {
    console.error('Error fetching DB cert.', { error });
    throw new Error(`Failed to fetch DB cert: ${error}`);
  }
};

const createDataSource = async (
  dbSecret: DbSecret,
  password: string,
  dbCaCert: string,
): Promise<DataSource> => {
  return new DataSource({
    type: 'postgres',
    host: dbSecret.host,
    port: dbSecret.port,
    username: dbSecret.username, // dbSecret.iam_username,
    password,
    database: dbSecret.dbname,
    schema: dbSecret.schema,
    entities: [...ENTITIES],
    maxQueryExecutionTime: 1000,
    synchronize: false,
    migrationsRun: false,
    migrations: [],
    extra: {
      connectionTimeoutMillis: 3000,
      idleTimeoutMillis: 1000,
      max: 1,
      ssl: {
        rejectUnauthorized: true,
        // ca: dbCaCert, 
      },
    },
    logging: ['error'],
  }).initialize();
};

export const initDataSource = async (): Promise<DataSource> => {
  if (dataSource?.isInitialized) {
    return dataSource;
  }

  const dbSecret = await getDBSecrets();
  // const dbCaCert = await getDatabaseCertificateString(dbSecret);
  const password = await getDBAuthToken(
    dbSecret.host,
    dbSecret.port,
    dbSecret.iam_username,
  );

  dataSource = await createDataSource(dbSecret, dbSecret.password, '');
  return dataSource;
};

export const getDataSource = async (): Promise<DataSource> => {
  if (
    !dataSource ||
    !dataSource.isInitialized ||
    Date.now() > tokenExpiry - 60 * 1000
  ) {
    console.info('Refreshing DB connection...', { tokenExpiry });

    if (dataSource?.isInitialized) {
      await dataSource.destroy();
    }

    dataSource = await initDataSource();
  }

  if (dataSource.isInitialized) {
    return dataSource;
  }

  throw new Error('Failed to initialize data source.');
};
