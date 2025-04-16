import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {
  AppModule,
  AuditDataEntity,
  CompanyIntegrationType,
  CompanyStatus,
  CompanyType,
  ProductFeature,
  EnumColumn,
  IntegerColumn,
  JsonColumn,
  TextColumn,
  StringColumn,
} from "../shared";
import { SsoDomain } from "./sso-domain.entity";

export class CompanyProductFeature {
  feature!: ProductFeature;
}

export class CompanyProduct {
  module!: AppModule;
}

export class CompanyIntegrationSettings {
  type!: CompanyIntegrationType;
}

export class CompanyIndustry {
  code!: string;
  name!: string;
}

export class CompanyAssessmentLanguage {
  enabled!: boolean;
  language!: string;
  is_default!: boolean;
}

export class CompanyLocale {
  locale!: string;
  is_default!: boolean;
}

export class CompanyJobSiteIntegrationMeta {
  google_analytics_measurement_id?: string;
  appearance_apply_button_label?: string;
  appearance_already_applied_to_this_job_button_label?: string;
}

export class CompanyVendorIntegrationMeta {
  willo_department_id?: string;
}

export class CompanyInternalContact {
  role!: string;
  email!: string;
}

@Entity('company')
export class Company extends AuditDataEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @IntegerColumn()
  parent_company_id!: number;

  @StringColumn({
    length: 255,
  })
  name!: string;

  @StringColumn({
    type: 'varchar',
    length: 100,
  })
  slug!: string;

  @EnumColumn({
    default: CompanyType.CLIENT,
    enum: CompanyType,
  })
  type!: CompanyType;

  @EnumColumn({
    default: CompanyStatus.ACTIVE,
    enum: CompanyStatus,
  })
  status!: CompanyStatus;

  @StringColumn({
    type: 'varchar',
    nullable: true,
    length: 50,
  })
  tenant_region?: string;

  @StringColumn({
    type: String,
    length: 1000,
    nullable: true,
  })
  domain?: string | null;

  /**
   * @deprecated Please use the domain in SsoDomain entity
   */
  @StringColumn({
    type: String,
    nullable: true,
    length: 255,
  })
  sso_domain?: string | null;

  @JsonColumn()
  industries!: CompanyIndustry[];

  @StringColumn({
    type: String,
    nullable: true,
    length: 500,
  })
  logo_url?: string | null;

  @StringColumn({
    type: String,
    nullable: true,
    length: 500,
  })
  banner_url?: string | null;

  @JsonColumn({ nullable: true })
  products?: CompanyProduct[];

  @StringColumn({
    type: "boolean",
    default: false,
  })
  is_live!: boolean;

  @JsonColumn({ nullable: true })
  job_site_integration_meta?: CompanyJobSiteIntegrationMeta;

  @JsonColumn({ nullable: true })
  assessment_languages?: CompanyAssessmentLanguage[];

  @JsonColumn({ nullable: true })
  locales?: CompanyLocale[];

  @StringColumn({
    length: 50,
    nullable: true,
  })
  timezone?: string;

  @Column({
    type: "boolean",
    nullable: true,
    default: false,
  })
  is_deleted?: boolean;

  @JsonColumn({ nullable: true })
  integration_settings!: CompanyIntegrationSettings[];

  @TextColumn({ type: "text", nullable: true })
  remarks?: string | null;

  @OneToMany(
    () => SsoDomain,
    (ssoDomain) => ssoDomain.default_auto_join_company
  )
  default_auto_join_sso_domains?: SsoDomain[];

  @JsonColumn({ nullable: true })
  vendor_integration_meta?: CompanyVendorIntegrationMeta;

  @JsonColumn({ nullable: true })
  internal_contacts!: CompanyInternalContact[];

  @JsonColumn({ nullable: true })
  product_features?: CompanyProductFeature[];

  @Column({
    type: "boolean",
    default: true,
  })
  is_product_access_control_enabled!: boolean;
}
