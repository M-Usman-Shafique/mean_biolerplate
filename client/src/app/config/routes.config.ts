import { environment } from "../../environments/environment";

export const apiRoutes = {
    baseURL: `${environment.apiUrl}/api`,
    login: "auth/login",
    signup: "auth/signup",
    logout: "auth/logout",
    validateAuth: "auth/validate",
    refreshAuth: "auth/refresh",
    checkout: "checkout",
    verifyStripeSession: "checkout/success",
};
