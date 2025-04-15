export type DbSecret = {
    username: string;
    iam_username: string;
    engine: string;
    port: number;
    host: string;
    password: string;
    schema: string;
    dbname: string;
    dbCaCert: string;
    dbInstanceIdentifier: string;
  };

  export class AuditDataEntity {
    created_at?: Date;
    created_by: number;
    updated_at?: Date;
    updated_by: number;
}