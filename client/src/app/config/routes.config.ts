import { environment } from "../../environments/environment";

export const apiRoutes = {
    baseURL: `${environment.apiUrl}/api`,
    login: "auth/login",
    signup: "auth/signup",
    logout: "auth/logout",
    refreshToken: "auth/refresh-token",
    resetPassword: "auth/reset-password",
    changePassword: "auth/change-password",
};
