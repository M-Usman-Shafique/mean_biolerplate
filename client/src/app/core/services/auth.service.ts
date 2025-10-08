import { inject, Injectable, signal } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiService } from "./api.service";
import { apiRoutes } from "../../config/routes.config";
import { clearStorage } from "../utils/localstorage.util";
import { filter, map, take } from "rxjs/operators";
import { toObservable } from "@angular/core/rxjs-interop";
import { AuthResponse } from "../types/auth";

@Injectable({ providedIn: "root" })
export class AuthService {
    private api = inject(ApiService);

    isAuthenticated = signal(false);
    private isValidating = false;
    private hasValidated = signal(false);

    setAuthState(value: boolean): void {
        this.isAuthenticated.set(value);
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated();
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

    private completeValidation(authenticated: boolean): void {
        this.setAuthState(authenticated);
        this.hasValidated.set(true);
    }

    validateAuth(): void {
        if (this.isValidating) return;
        this.isValidating = true;

        this.api.get(apiRoutes.validateAuth).subscribe({
            next: () => this.completeValidation(true),
            error: () => {
                console.warn("Session expired, trying refresh...");
                this.refreshAuth().subscribe({
                    next: () => {
                        console.log("Session refreshed successfully.");
                        this.completeValidation(true);
                    },
                    error: () => {
                        console.error("Session could not be refreshed. Please log in again.");
                        clearStorage("userInfo");
                        this.completeValidation(false);
                    },
                });
            },
        });
    }

    refreshAuth(): Observable<{ accessToken: string }> {
        return this.api.post<{ accessToken: string }>(apiRoutes.refreshAuth, {});
    }

    authReady(): Observable<boolean> {
        return this.hasValidated()
            ? of(this.isAuthenticated())
            : toObservable(this.hasValidated).pipe(
                  filter(Boolean),
                  map(() => this.isAuthenticated()),
                  take(1)
              );
    }
}
