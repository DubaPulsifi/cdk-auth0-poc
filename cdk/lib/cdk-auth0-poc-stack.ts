import "reflect-metadata";
import 'dotenv/config'
import { Construct } from "constructs";
import { LambdaBuilder } from "./build";
import path = require("path");
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkAuth0PocStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaBuilder = new LambdaBuilder(
      this,
      path.join(__dirname, "../infra/lambda")
    );

    const queue = new Queue(this, "IdentityFnPOCQueue", {
      visibilityTimeout: Duration.seconds(300),
      fifo: true,
      queueName: "identity-fn-poc-queue.fifo",
    });

    const dbSecret = Secret.fromSecretNameV2(this, 'DBSecret', 'identity-postgresql-credential');

    const auth0AccountSetupPOCLambda = lambdaBuilder.createQueueProcessor(
      "Auth0AccountSetupPOCHandler",
      queue,
      {
        fileName: "auth0-account-setup-poc.ts",
        name: "auth0-account-setup-poc",
        environment: {
          SM_NAME: "identity-postgresql-credential",
          REGION: process.env.CDK_DEPLOY_REGION as string,
          NOTIFICATION_EMAIL_QUEUE: "NOTIFICATION_EMAIL_QUEUE",
          SENTRY_DSN: "https://b79130468ac5a32c12a79256a7812582@o157451.ingest.us.sentry.io/4508103154728960",
          SERVERLESS_STAGE: "development",
          AUTH0_DOMAIN: "https://sandbox-id.pulsifi.me/",
          AUTH0_API_AUDIENCE: "https://sandbox.api.pulsifi.me/",
          AUTH0_MANAGEMENT_AUDIENCE: "https://sandbox.api.pulsifi.me/",
          AUTH0_M2M_CLIENT_ID: "uydKnETZG8ZDDNbce7NqGZiObZPqySo0",
          AUTH0_M2M_CLIENT_SECRET:
            "IX6JVgrWRyy9X8KxC6fXbGbpZwAs8bflOG41a4qeIYhtfnnPBQ6j4KlZcQDo0MyB",
          AUTH0_ENTERPRISE_DOMAIN: "https://sandbox-enterprise-id.pulsifi.me/",
          AUTH0_ENTERPRISE_API_AUDIENCE: "https://sandbox.api.pulsifi.me/",
          AUTH0_ENTERPRISE_MANAGEMENT_AUDIENCE:
            "https://pulsifi-sandbox-enterprise.us.auth0.com/api/v2/",
          AUTH0_ENTERPRISE_M2M_CLIENT_ID: "uydKnETZG8ZDDNbce7NqGZiObZPqySo0",
          AUTH0_ENTERPRISE_M2M_CLIENT_SECRET:
            "IX6JVgrWRyy9X8KxC6fXbGbpZwAs8bflOG41a4qeIYhtfnnPBQ6j4KlZcQDo0MyB",
        },
      }
    );

    dbSecret.grantRead(auth0AccountSetupPOCLambda);
    dbSecret.grantWrite(auth0AccountSetupPOCLambda);
  }
}
