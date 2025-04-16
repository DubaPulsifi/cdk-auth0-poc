import "reflect-metadata";
import "dotenv/config";
import { Construct } from "constructs";
import { LambdaBuilder } from "./build";
import path = require("path");
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { SecurityGroupResources } from "./security-groups";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IdentityFnUserRegistrationStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaBuilder = new LambdaBuilder(
      this,
      path.join(__dirname, "../infra/lambda")
    );

    const queue = new Queue(this, "IdentityFnUserRegistrationQueue", {
      visibilityTimeout: Duration.seconds(300),
      fifo: true,
      queueName: "identity-fn-user-registration-queue.fifo",
    });

    const notificationQueue = Queue.fromQueueArn(
      this,
      "NotificationEmailQueue",
      `arn:aws:sqs:${Stack.of(this).region}:${Stack.of(this).account}:notification-email-request-queue`
    );

    /* SECURITY GROUP */
    const securityGroupResources = new SecurityGroupResources(
      this,
      "security-group-resources"
    );

    const dbSecret = Secret.fromSecretNameV2(
      this,
      "DBSecret",
      "identity-postgresql-credential"
    );

    const identityFnUserRegistrationLambda = lambdaBuilder.createQueueProcessor(
      "IdentityFnUserRegistrationHandler",
      queue,
      {
        fileName: "identity-fn-user-registration.ts",
        name: "identity-fn-user-registration",
        securityGroups: securityGroupResources,
        environment: {
          SM_NAME: "identity-postgresql-credential",
          REGION: process.env.CDK_DEPLOY_REGION as string,
          NOTIFICATION_EMAIL_QUEUE: StringParameter.valueForStringParameter(
            this,
            "/configs/api/AWS_SQS_BASE_DNS"
          ),
          SENTRY_DSN:
            "https://b79130468ac5a32c12a79256a7812582@o157451.ingest.us.sentry.io/4508103154728960",
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

    dbSecret.grantRead(identityFnUserRegistrationLambda);
    dbSecret.grantWrite(identityFnUserRegistrationLambda);

    notificationQueue.grantSendMessages(identityFnUserRegistrationLambda);

    identityFnUserRegistrationLambda.node.addDependency(securityGroupResources);
  }
}
