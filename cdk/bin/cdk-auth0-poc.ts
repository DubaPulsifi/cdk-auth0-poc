#!/usr/bin/env node
import "reflect-metadata"
import 'dotenv/config';
import { CdkAuth0PocStack } from '../lib/cdk-auth0-poc-stack';
import { App, Tags } from "aws-cdk-lib";

const app = new App();
const stackName = `identity-fn-${process.env.NODE_ENV}-stack`;
const stack = new CdkAuth0PocStack(app, 'CdkAuth0PocStack', {
  stackName,
  env: { account: process.env.CDK_DEPLOY_ACCOUNT, region: process.env.CDK_DEPLOY_REGION },
});

// Tags.of(stack).add('Owner', PulsifiTeam.ENGINEERING);
// Tags.of(stack).add('Environment', process.env.NODE_ENV);
Tags.of(stack).add('Stack', stackName);