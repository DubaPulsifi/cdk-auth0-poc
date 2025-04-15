import type { NodeOptions } from '@sentry/node';
import { envUtil } from '../utils';

export const sentryConfig: NodeOptions = {
  dsn: envUtil.get('SENTRY_DSN'),
  tracesSampleRate: 0.1,
  environment: envUtil.get('SERVERLESS_STAGE'),
};
