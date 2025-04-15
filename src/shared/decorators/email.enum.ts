export enum EmailTemplateCommunicationType {
    CONSOLE_ACCOUNT_INVITATION = 'console_account_invitation', //system ,new user
    CONSOLE_WELCOME_ACCOUNT = 'console_welcome_account', //system ,existing user
    ACCOUNT_INVITATION = 'account_invitation', //system ,new user
    WELCOME_ACCOUNT = 'welcome_account', //system, existing user
    SSO_ACCOUNT_INVITATION = 'sso_account_invitation', //system
    EMPLOYEE_ACCOUNT_INVITATION = 'employee_account_invitation', //system, new user
    EMPLOYEE_WELCOME_ACCOUNT = 'employee_welcome_account', //system, existing user
    EMPLOYEE_SSO_ACCOUNT_INVITATION = 'employee_sso_account_invitation', //system
    DATA_DOWNLOAD_CONFIRMATION = 'data_download_confirmation', //system, for candidate data export
    APPLICATION_DOCUMENT_DOWNLOAD_CONFIRMATION = 'application_document_download_confirmation', //system, for export candidate assessment report, resume/attachment
    PROGRAM_REMINDER = 'program_reminder', //employee
    JOB_APPLY_INVITATION = 'job_apply_invitation', //candidate
    APPLICATION_REMINDER = 'application_reminder', //candidate
    APPLICATION_SHORTLIST = 'application_shortlist', //candidate
    APPLICATION_REJECT = 'application_reject', //candidate
    ASSESSMENT_INVITATION = 'assessment_invitation', //candidate
    VIDEO_INVITATION = 'video_invitation', //candidate
    VIDEO_INTERVIEW_REMINDER = 'video_interview_reminder', //candidate
}
