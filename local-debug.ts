import "reflect-metadata";
import "dotenv/config";

import { handler } from "./cdk/infra/lambda/identity-fn-user-registration";
import { Auth0Database, Auth0Tenant } from "./src/shared";
import { generatorUtil } from "@pulsifi/fn/utils/generator.util";
import { deleteAuth0User } from "./src/services";

const testEvent = {
  Records: [
    {
      body: JSON.stringify({
        data: {
          email: "bulk.test.010@yopmail.com",
          email_verified: true,
          password: "j~J<DsAxGSX&5F^4m4",
          given_name: "John",
          family_name: "Doe",
          name: "John Doe",
          app_metadata: {
            user_account_id: 42225,
          },
          user_metadata: {
            locale: "en-US",
            timezone: "Europe/Istanbul",
          },
          connection: "talent-database",
        },
        tenant: "Enterprise",
        company: {
          id: 308,
          name: "APItude SANDBOX",
        },
      }),
      messageId: "test-id",
      receiptHandle: "test-handle",
      attributes: {
        ApproximateReceiveCount: "1",
        SentTimestamp: "1234567890",
        SenderId: "SENDER",
        ApproximateFirstReceiveTimestamp: "1234567890",
      },
      messageAttributes: {},
      md5OfBody: "test-md5",
      eventSource: "aws:sqs",
      eventSourceARN: "test:arn",
      awsRegion: "us-east-1",
    },
  ],
};

async function debugHandler() {
  try {
    console.log(JSON.parse(testEvent.Records[0].body));

    const deleteResult = await deleteAuth0User(
      "bulk.test.011@yopmail.com",
      Auth0Tenant.ENTERPRISE
    );
    console.log("Delete Success:", deleteResult);

    const handleresult = await handler(testEvent);
    console.log("HandlerSuccess:", handleresult);
  } catch (error) {
    console.error("Error:", error);
  }
}

debugHandler();
