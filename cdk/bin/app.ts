#!/usr/bin/env node
import "reflect-metadata"
import 'dotenv/config';
import { IdentityFnUserRegistrationStack } from '../lib/identity-fn-user-registration-stack';
import { App, Tags } from "aws-cdk-lib";
import { PulsifiTeam } from "@pulsifi/custom-aws-cdk-lib";

const app = new App();
const stackName = `identity-fn-user-registration-${process.env.NODE_ENV}-stack`;
const stack = new IdentityFnUserRegistrationStack(app, 'IdentityFnUserRegistrationStack', {
  stackName,
  env: { account: process.env.CDK_DEPLOY_ACCOUNT, region: process.env.CDK_DEPLOY_REGION },
});

Tags.of(stack).add('Owner', PulsifiTeam.ENGINEERING);
Tags.of(stack).add('Environment', process.env.NODE_ENV as string);
Tags.of(stack).add('Stack', stackName);