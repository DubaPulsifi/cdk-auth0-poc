import { WebApp } from "../constants";
import { WebAppUrl } from "../types";


export const webAppUrlConfig: WebAppUrl = {
    [WebApp.CANDIDATE]:
        process.env.WEB_APP_CANDIDATE_URL ||
        'https://sandbox-candidate.pulsifi.me',
    [WebApp.CONSOLE]:
        process.env.WEB_APP_CONSOLE_URL ||
        'https://sandbox-console.pulsifi.me',
    [WebApp.EMPLOYEE]:
        process.env.WEB_APP_EMPLOYEE_URL ||
        'https://sandbox-employee.pulsifi.me',
    [WebApp.INTEGRATION]:
        process.env.WEB_APP_INTEGRATION_URL ||
        'https://sandbox-candidate.pulsifi.me',
    [WebApp.RESELLER]:
        process.env.WEB_APP_RESELLER_URL ||
        'https://sandbox-console.pulsifi.me',
    [WebApp.TALENT]:
        process.env.WEB_APP_TALENT_URL || 'https://sandbox-app.pulsifi.me',
};