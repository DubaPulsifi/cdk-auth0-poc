export const getDomainName = (value: string) => {
  return value?.replace("https://", "").replace("/", "") || "";
};
export const getEmailDomainName = (email: string) => {
  return email.split("@")[1];
};
export const decodeBase64 = (value: string) => {
  return Buffer.from(value, "base64").toString("utf8");
};
export const encodeBase64 = (value: string) => {
  return Buffer.from(value).toString("base64");
};
export const sanitizeSNSToSQSMessage = (message: string) => {
  const sqsRegexNotAllowedList =
    /[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]/gu;
  return message.replace(sqsRegexNotAllowedList, "");
};
export const sanitizeSNSToSQSMessageData = (
  data: { [key: string]: any } | string
) => {
  if (typeof data === "string") {
    return sanitizeSNSToSQSMessage(data);
  }
  if (data !== null && typeof data === "object") {
    for (const key in data) {
      data[key] = sanitizeSNSToSQSMessageData(data[key]);
    }
    return data;
  }
  return data;
};
