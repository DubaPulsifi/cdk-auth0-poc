export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
}

export enum UserStatus {
    ACTIVE = 'active',
    PENDING = 'pending',
    DISABLED = 'disabled',
}

export enum BulkImportToggleValue {
    YES = 'yes',
    NO = 'no',
}

export enum UserExtTenant {
    ENTERPRISE = 'enterprise',
    DEFAULT = 'default',
}

export const USER_INVITATION_EXPIRY_IN_DAYS = 7;

export enum UserAccountActionType {
    USER_ACCOUNT_CREATED = 'user_account_created',
    USER_ACCOUNT_UPDATED = 'user_account_updated',
    USER_ACCOUNT_DELETED = 'user_account_deleted',
    USER_ACCOUNT_UPGRADED_TO_SSO = 'user_account_upgraded_to_sso',
    USER_INVITATION_ACCEPTED = 'user_invitation_accepted',
    USER_COMPANY_APP_ACCESS_DELETED = 'user_company_app_access_deleted',
    RESENT_USER_INVITATION = 'resent_user_invitation',
    USER_PREFERENCE_UPSERT = 'user_preference_upsert',
}

export const ValidUserGenders = Object.values(UserGender).map(String);
export const ValidUserStatuses = Object.values(UserStatus).map(String);
export const ValidBulkImportToggleValues = Object.values(
    BulkImportToggleValue,
).map(String);
