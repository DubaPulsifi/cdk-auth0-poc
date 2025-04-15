import { envUtil } from "../utils";
import { SqsConfig } from "@pulsifi/fn/interfaces/aws.interface";

export const awsConfig = {
  region: envUtil.get('REGION'),
  // alb: {
  //   dns: envUtil.get('AWS_ALB_DNS'),
  // },
  sqs: <SqsConfig>{
    region: envUtil.get("REGION"),
    apiVersion: "2012-11-05",
    queueUrl:
      envUtil.get("NOTIFICATION_EMAIL_QUEUE") +
      "notification-email-request-queue",
  },
  // s3: {
  //   region: envUtil.get("REGION"),
  //   document_download_bucket: envUtil.get("S3_DOCUMENT_DOWNLOAD_BUCKET"),
  //   document_download_domain: envUtil.get("PULSIFI_DOCUMENT_DOWNLOAD_DOMAIN"),
  //   apiVersion: "2006-03-01",
  // },
};
