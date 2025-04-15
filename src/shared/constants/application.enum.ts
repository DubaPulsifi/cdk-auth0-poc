export enum AppModule {
    candidate = "candidate",
    console = "console",
    employee = "employee",
    employee_learning = "employee_learning",
    integration = "integration",
    reseller = "reseller",
    talent_acquisition = "talent_acquisition",
    talent_administration = "talent_administration",
    talent_management = "talent_management",
    talent_learning = "talent_learning",
    talent_pool = "talent_pool"
}

export enum ApplicationId {
    CONSOLE = 1,
    EMPLOYEE = 4,
    TALENT = 5,
    CANDIDATE = 6,
    INTEGRATION = 31,
    RESELLER = 32,
}

export enum WebApp {
    CANDIDATE = "candidate",
    CONSOLE = "console",
    EMPLOYEE = "employee",
    INTEGRATION = "integration",
    RESELLER = "reseller",
    TALENT = "talent"
}

export const WebAppToApplicationIdMappings: Record<WebApp, ApplicationId> = {
    [WebApp.CONSOLE]: ApplicationId.CONSOLE,
    [WebApp.EMPLOYEE]: ApplicationId.EMPLOYEE,
    [WebApp.TALENT]: ApplicationId.TALENT,
    [WebApp.CANDIDATE]: ApplicationId.CANDIDATE,
    [WebApp.INTEGRATION]: ApplicationId.INTEGRATION,
    [WebApp.RESELLER]: ApplicationId.RESELLER,
};

export const AppModuleToWebAppMappings: Record<AppModule, WebApp> = {
    [AppModule.candidate]: WebApp.CANDIDATE,
    [AppModule.console]: WebApp.CONSOLE,
    [AppModule.employee]: WebApp.EMPLOYEE,
    [AppModule.employee_learning]: WebApp.EMPLOYEE,
    [AppModule.integration]: WebApp.INTEGRATION,
    [AppModule.reseller]: WebApp.RESELLER,
    [AppModule.talent_acquisition]: WebApp.TALENT,
    [AppModule.talent_administration]: WebApp.TALENT,
    [AppModule.talent_learning]: WebApp.TALENT,
    [AppModule.talent_management]: WebApp.TALENT,
    [AppModule.talent_pool]: WebApp.TALENT,
};

export const AppModuleToApplicationIdMappings: Record<
    AppModule,
    ApplicationId
> = {
    [AppModule.candidate]: ApplicationId.CANDIDATE,
    [AppModule.console]: ApplicationId.CONSOLE,
    [AppModule.employee]: ApplicationId.EMPLOYEE,
    [AppModule.employee_learning]: ApplicationId.EMPLOYEE,
    [AppModule.integration]: ApplicationId.INTEGRATION,
    [AppModule.reseller]: ApplicationId.RESELLER,
    [AppModule.talent_acquisition]: ApplicationId.TALENT,
    [AppModule.talent_administration]: ApplicationId.TALENT,
    [AppModule.talent_learning]: ApplicationId.TALENT,
    [AppModule.talent_management]: ApplicationId.TALENT,
    [AppModule.talent_pool]: ApplicationId.TALENT,
};

export const TalentModules = [
    AppModule.talent_acquisition,
    AppModule.talent_administration,
    AppModule.talent_management,
    AppModule.talent_learning,
];

export const EmployeeModules = [
    AppModule.employee,
    AppModule.employee_learning,
];

export const AppModuleLowestPrivilegeMappings: { [K in AppModule]?: string } =
    {
        [AppModule.talent_acquisition]: 'hiring_team_member',
    };

export enum DedicatedUserAccountName {
    SYSTEM = 'system',
    PULSIFI_SYSTEM = 'Pulsifi System',
}
