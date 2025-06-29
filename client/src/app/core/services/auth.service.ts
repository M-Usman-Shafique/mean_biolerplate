import { inject, Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { apiRoutes } from "../../config/routes.config";
import { AuthResponse } from "../constants/types";

@Injectable({ providedIn: "root" })
export class AuthService {
    private api = inject(ApiService);
    isLoggedIn = signal(false);

    setAuthState(value: boolean): void {
        this.isLoggedIn.set(value);
    }


    signup(payload: any): Observable<AuthResponse> {
        return this.api.post<AuthResponse>(apiRoutes.signup, payload);
    }

    login(payload: any): Observable<AuthResponse> {
        return this.api.post<AuthResponse>(apiRoutes.login, payload);
    }

    logout(): Observable<{ message: string }> {
        return this.api.post<{ message: string }>(apiRoutes.logout, {});
    }

    refreshToken(): Observable<{ accessToken: string }> {
        return this.api.post<{ accessToken: string }>(apiRoutes.refreshToken, {});
    }
}
