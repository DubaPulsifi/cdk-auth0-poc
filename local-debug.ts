import "reflect-metadata";
import "dotenv/config";

import { handler } from "./cdk/infra/lambda/auth0-account-setup-poc";
import { Auth0Database, Auth0Tenant } from "./src/shared";
import { generatorUtil } from "@pulsifi/fn/utils/generator.util";
import { deleteAuth0User } from "./src/services";

const testEvent = {
  Records: [
    {
      body: JSON.stringify({
        data: {
          email: "test-email@pulsifi.me",
          email_verified: true,
          password: generatorUtil.password(18),
          given_name: 'John',
          family_name: 'Doe',
          name: 'John Doe',
          app_metadata: {
            user_account_id: 1,
          },
          user_metadata: {},
          connection: Auth0Database.TALENT,
        },
        tenant: "Enterprise",
        company: {
          id: "456",
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
    
    const result = deleteAuth0User('test001@bulk.com', Auth0Tenant.ENTERPRISE)
    // const result = await handler(testEvent);
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

debugHandler();
