export interface AppMetadataRole {
    alias: string;
    module_type: string;
}

export interface AppMetadataCompanyItem {
    company_id: number;
    company_slug: string;
    roles: AppMetadataRole[];
}

export interface AppMetadataCompany {
    company: AppMetadataCompanyItem[];
}

export interface AppMetadataEmployee {
    company_id: number;
    company_slug: string;
    employee_id: string;
}

export interface Auth0AppMetadata {
    user_account_id?: number;
    force_change_password?: boolean;
    last_password_changed_at?: number;
    talent_beta?: AppMetadataCompany;
    employee?: AppMetadataEmployee;
}

export interface Auth0UserMetadata {
    preferred_company_id?: number;
}

export interface Auth0UserDto {
    user_id?: string;
    email?: string;
    given_name?: string;
    family_name?: string;
    connection?: string;
    password?: string;
    picture?: string;
    app_metadata?: Auth0AppMetadata;
    user_metadata?: Auth0UserMetadata;
}
