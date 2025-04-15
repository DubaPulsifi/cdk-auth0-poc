import * as path from 'path';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { Duration } from 'aws-cdk-lib';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Queue } from 'aws-cdk-lib/aws-sqs';

interface LambdaConfig {
  fileName: string;
  handler?: string;
  timeout?: Duration;
  memorySize?: number;
  environment?: { [key: string]: string };
  name: string;
}

export class LambdaBuilder {
  private readonly scope: Construct;
  private readonly lambdaPath: string;

  constructor(scope: Construct, lambdaPath: string) {
    this.scope = scope;
    this.lambdaPath = lambdaPath;
  }

  createFunction(id: string, config: LambdaConfig): NodejsFunction {
    const defaultProps: NodejsFunctionProps = {
      runtime: Runtime.NODEJS_LATEST,
      entry: path.join(this.lambdaPath, config.fileName),
      handler: config.handler || 'handler',
      functionName: config.name || id,
      timeout: config.timeout || Duration.seconds(30),
      memorySize: config.memorySize || 128,
      environment: config.environment,
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'node18',
        externalModules: [
          'aws-sdk',
          '@aws-sdk/*'
        ],
        define: {
          'process.env.NODE_ENV': '"production"'
        },
      }
    };

    return new NodejsFunction(this.scope, id, defaultProps);
  }

  createQueueProcessor(
    id: string,
    queue: Queue,
    config: LambdaConfig,
    options?: {
      batchSize?: number;
      maxBatchingWindow?: Duration;
    }
  ): NodejsFunction {
    // Create the base Lambda function
    const fn = new NodejsFunction(this.scope, id, {
      runtime: Runtime.NODEJS_LATEST,
      entry: path.join(this.lambdaPath, config.fileName),
      handler: config.handler || 'handler',
      timeout: config.timeout || Duration.seconds(30),
      memorySize: config.memorySize || 128,
      functionName: config.name || id,
      environment: {
        QUEUE_URL: queue.queueUrl,
        ...config.environment,
      },
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'node18',
        externalModules: [
          'aws-sdk',
          '@aws-sdk/*',
        ],
        define: {
          'process.env.NODE_ENV': '"production"'
        },
      }
    });

    // Add the SQS queue as an event source
    fn.addEventSource(new SqsEventSource(queue, {
      ...(options?.batchSize && { batchSize: options.batchSize }),
      ...(options?.maxBatchingWindow && { maxBatchingWindow: options.maxBatchingWindow }),
    }));

    // Grant the Lambda function permissions to read from the queue
    queue.grantConsumeMessages(fn);

    return fn;
  }
}
