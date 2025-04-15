export enum RbacRole {
    BASIC_USER = 'basic_user',
    ADMINISTRATOR = 'administrator',
    TALENT_MANAGER = 'talent_manager',
    RECRUITMENT_MANAGER = 'recruitment_manager',
    RECRUITER = 'recruiter',
}

export enum RbacApplication {
    TALENT = 'talent',
    EMPLOYEE = 'employee',
}

export enum RbacRoleType {
    DEFAULT = 'default',
    CUSTOM = 'custom',
}

export enum RbacStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export enum RbacModule {
    BILLING = 'billing',
    CREDIT_USAGE_DASHBOARD = 'credit_usage_dashboard',
    AUDIT_LOG = 'audit_log',
    ROLE_MANAGEMENT = 'role_management',
    USER_MANAGEMENT = 'user_management',
    GROUP_MANAGEMENT = 'group_management',
    JOB_AND_CANDIDATE_MANAGEMENT = 'job_and_candidate_management',
    JOB_AND_CANDIDATE_DASHBOARD = 'job_and_candidate_dashboard',
    JOB_AND_CANDIDATE_CSV_REPORTING = 'job_and_candidate_csv_reporting',
    TALENT_PROFILE_EMPLOYEE_POOL = 'talent_profile_employee_pool',
    TALENT_PROFILE_CANDIDATE_POOL = 'talent_profile_candidate_pool',
    PROGRAM_MANAGEMENT = 'program_management',
    ASSESSMENT_INSIGHT = 'assessment_insight',
    FEEDBACK_CYCLE_MANAGEMENT = 'feedback_cycle_management',
    FEEDBACK_RESULTS = 'feedback_results',
    IDP_MANAGEMENT = 'idp_management',
    SUCCESS_PROFILE_MANAGEMENT = 'success_profile_management',
    DATA_EXPLORER_DASHBOARD = 'data_explorer_dashboard',
    DATA_EXPLORER_MANAGEMENT = 'data_explorer_management',
    EMPLOYEE_ACCESS = 'employee_access',
    LEARNING_ACCESS = 'learning_access',
}

export enum RbacModuleGroup {
    ADMINISTRATION = 'administration',
    CREDIT_USAGE = 'credit_usage',
    USER_ACCESS_MANAGEMENT = 'user_access_management',
    RECRUITMENT = 'recruitment',
    TALENT_POOL = 'talent_pool',
    ASSESSMENTS_AND_PROGRAMS = 'assessments_and_programs',
    FEEDBACK_CYCLE = 'feedback_cycle',
    LEARNING = 'learning',
    SUCCESS_PROFILE = 'success_profile',
    DATA_EXPLORER = 'data_explorer',
    EMPLOYEE_ACCOUNT = 'employee_account',
}

export enum RbacPermissionType {
    NO_ACCESS = 'no_access',
    CAN_MANAGE = 'can_manage',
    CAN_EDIT = 'can_edit',
    CAN_VIEW = 'can_view',
}

export enum RbacResourceRestrictionPolicy {
    COLLAB = 'collab',
    FULL = 'full',
    SELF = 'self',
    NO_ACCESS = 'no_access',
}

export enum RbacAction {
    // Not available in production
    BILLING_READ = 'billing.read',
    AUDIT_LOG_READ = 'audit_log.read',
    CREDIT_USAGE_DASHBOARD_READ = 'credit_usage_dashboard.read',
    ROLE_MANAGEMENT_CREATE = 'role_management.create',
    ROLE_MANAGEMENT_READ = 'role_management.read',
    ROLE_MANAGEMENT_UPDATE = 'role_management.update',
    ROLE_MANAGEMENT_DELETE = 'role_management.delete',

    // Available in production
    USER_MANAGEMENT_CREATE = 'user_management.create',
    USER_MANAGEMENT_READ = 'user_management.read',
    USER_MANAGEMENT_UPDATE = 'user_management.update',
    USER_MANAGEMENT_DELETE = 'user_management.delete',
    GROUP_MANAGEMENT_CREATE = 'group_management.create',
    GROUP_MANAGEMENT_READ = 'group_management.read',
    GROUP_MANAGEMENT_UPDATE = 'group_management.update',
    GROUP_MANAGEMENT_DELETE = 'group_management.delete',
    JOB_CREATE = 'job.create',
    JOB_READ = 'job.read',
    JOB_UPDATE = 'job.update',
    JOB_DELETE = 'job.delete',
    JOB_SHARE_CREATE = 'job_share.create',
    CANDIDATE_CREATE = 'candidate.create',
    CANDIDATE_READ = 'candidate.read',
    CANDIDATE_UPDATE = 'candidate.update',
    CANDIDATE_DELETE = 'candidate.delete',
    CANDIDATE_INVITATION_CREATE = 'candidate_invitation.create',
    CANDIDATE_STAGE_UPDATE = 'candidate_stage.update',
    CANDIDATE_COMMENT_CREATE = 'candidate_comment.create',
    CANDIDATE_COMMENT_READ = 'candidate_comment.read',
    CANDIDATE_COMMENT_UPDATE = 'candidate_comment.update',
    CANDIDATE_COMMENT_DELETE = 'candidate_comment.delete',
    CANDIDATE_COMMENT_PRIVATE_CREATE = 'candidate_comment_private.create',
    CANDIDATE_INTERVIEW_RATING_CREATE = 'candidate_interview_rating.create',
    CANDIDATE_INTERVIEW_RATING_READ = 'candidate_interview_rating.read',
    CANDIDATE_INTERVIEW_RATING_UPDATE = 'candidate_interview_rating.update',
    CANDIDATE_INTERVIEW_RATING_DELETE = 'candidate_interview_rating.delete',
    CANDIDATE_DASHBOARD_READ = 'candidate_dashboard.read',
    CANDIDATE_REPORT_CREATE = 'candidate_report.create',
    TALENT_POOL_PROFILE_READ = 'talent_pool_profile.read',
    TALENT_POOL_FOLDER_CREATE = 'talent_pool_folder.create',
    TALENT_POOL_FOLDER_READ = 'talent_pool_folder.read',
    TALENT_POOL_FOLDER_UPDATE = 'talent_pool_folder.update',
    TALENT_POOL_FOLDER_DELETE = 'talent_pool_folder.delete',
    TALENT_POOL_INVITATION_CREATE = 'talent_pool_invitation.create',
    PROGRAM_CREATE = 'program.create',
    PROGRAM_READ = 'program.read',
    PROGRAM_UPDATE = 'program.update',
    PROGRAM_DELETE = 'program.delete',
    PROGRAM_REMINDER_CREATE = 'program_reminder.create',
    PROGRAM_INSIGHTS_READ = 'program_insights.read',
    PROGRAM_REPORT_CREATE = 'program_report.create',
    PROGRAM_ASSESSMENT_RESULT_READ = 'program_assessment_result.read',
    FEEDBACK_CYCLE_CREATE = 'feedback_cycle.create',
    FEEDBACK_CYCLE_READ = 'feedback_cycle.read',
    FEEDBACK_CYCLE_UPDATE = 'feedback_cycle.update',
    FEEDBACK_CYCLE_DELETE = 'feedback_cycle.delete',
    FEEDBACK_CYCLE_REPORT_CREATE = 'feedback_cycle_report.create',
    FEEDBACK_CYCLE_RESULT_CREATE = 'feedback_cycle_result.create',
    IDP_MANAGEMENT_CREATE = 'idp_management.create',
    IDP_MANAGEMENT_READ = 'idp_management.read',
    IDP_MANAGEMENT_UPDATE = 'idp_management.update',
    IDP_MANAGEMENT_DELETE = 'idp_management.delete',
    SUCCESS_PROFILE_MANAGEMENT_CREATE = 'success_profile_management.create',
    SUCCESS_PROFILE_MANAGEMENT_READ = 'success_profile_management.read',
    SUCCESS_PROFILE_MANAGEMENT_UPDATE = 'success_profile_management.update',
    SUCCESS_PROFILE_MANAGEMENT_DELETE = 'success_profile_management.delete',
    EMPLOYEE_ACCESS_CREATE = 'employee_access.create',
    EMPLOYEE_ACCESS_READ = 'employee_access.read',
    EMPLOYEE_ACCESS_UPDATE = 'employee_access.update',
    EMPLOYEE_ACCESS_DELETE = 'employee_access.delete',
    LEARNING_ACCESS_CREATE = 'learning_access.create',
    LEARNING_ACCESS_READ = 'learning_access.read',
    LEARNING_ACCESS_UPDATE = 'learning_access.update',
    LEARNING_ACCESS_DELETE = 'learning_access.delete',
}

export enum RbacSeat {
    ADMIN = 'admin',
    DATA_EXPLORER = 'data_explorer',
    EMPLOYEE = 'employee',
    LEARNING = 'learning',
}
