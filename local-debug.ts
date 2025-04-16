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
          email: "test001@bulk.com",
          email_verified: true,
          password: generatorUtil.password(18),
          given_name: "John",
          family_name: "Doe",
          name: "John Doe",
          app_metadata: {
            user_account_id: 41988,
          },
          user_metadata: { locale: "en-US", timezone: "Europe/Istanbul" },
          connection: Auth0Database.TALENT,
        },
        tenant: "Enterprise",
        company: {
          id: "308",
          name: "Test Company",
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
      "test001@bulk.com",
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
