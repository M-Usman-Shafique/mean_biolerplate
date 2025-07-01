import { environment } from "../../environments/environment";

export const apiRoutes = {
    baseURL: `${environment.apiUrl}/api`,
    login: "auth/login",
    signup: "auth/signup",
    logout: "auth/logout",
    validateSession: "auth/validate",
    refreshSession: "auth/refresh",
};
