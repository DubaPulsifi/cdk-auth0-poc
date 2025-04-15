import { logger } from '.';

const get = (key: string, defaultValue?: SafeAny): string => {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    const errorMessage = `Unable find environment variable - '${key}'`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  return value || defaultValue;
};

const getInt = (key: string, defaultValue?: SafeAny): number => {
  const value = get(key, defaultValue);

  return Number.parseInt(value);
};

export const envUtil = {
  get,
  getInt,
};
