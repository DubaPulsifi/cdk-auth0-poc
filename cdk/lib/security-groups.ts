import {
  AwsEnvironment,
  CustomSecurityGroupConstruct,
  PulsifiTeam,
} from '@pulsifi/custom-aws-cdk-lib';
import { Port, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';

const name = 'auth0-poc-app'

export class SecurityGroupResources extends Construct {
  public readonly securityGroup: CustomSecurityGroupConstruct;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    /* lambda security group */
    this.securityGroup = new CustomSecurityGroupConstruct(
      this,
      `${id}-security-group`,
      {
        resourceName: name,
        awsEnvironment: AwsEnvironment.SANDBOX,
        resourceOwner: PulsifiTeam.ENGINEERING,
        region: process.env.CDK_DEPLOY_REGION as string,
        accountId: process.env.CDK_DEPLOY_ACCOUNT as string,
      },
    );

    /* postgresql */
    const dbSecurityGroupName = StringParameter.valueFromLookup(
      this,
      '/configs/RDS/DB_SECURITY_GROUP_NAME',
    );

    const targetSecurityGroup = SecurityGroup.fromLookupByName(
      this,
      'db-target-security-group',
      dbSecurityGroupName,
      this.securityGroup.vpc,
    );

    /**
     * add ingress rule to postgres ID for lambda ID
     */
    targetSecurityGroup.addIngressRule(
      this.securityGroup.securityGroup,
      Port.tcp(5432),
      this.securityGroup.securityGroupName,
    );
  }
}
