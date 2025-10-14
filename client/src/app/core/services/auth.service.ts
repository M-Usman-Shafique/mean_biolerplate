import { inject, Injectable, signal } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiService } from "./api.service";
import { apiRoutes } from "../../config/routes.config";
import { clearStorage, getFromStorage, setToStorage } from "../utils/localstorage.util";
import { filter, map, take } from "rxjs/operators";
import { toObservable } from "@angular/core/rxjs-interop";
import { AuthResponse, User } from "../types/auth";

@Injectable({ providedIn: "root" })
export class AuthService {
    private apiService = inject(ApiService);

    isAuthenticated = signal(false);
    currentUser = signal<User | null>(null);
    private isValidating = false;
    private hasValidated = signal(false);

    setAuthState(isAuthenticated: boolean, user?: User): void {
        this.isAuthenticated.set(isAuthenticated);
        if (user) {
            this.currentUser.set(user);
            setToStorage("userInfo", user);
        } else {
            this.currentUser.set(null);
        }
    }

    isLoggedIn(): boolean {
        return this.isAuthenticated();
    }

    isAdmin(): boolean {
        const user = this.currentUser();
        return user?.role === "admin";
    }

    isUser(): boolean {
        const user = this.currentUser();
        return user?.role === "user";
    }

    getCurrentUser(): User | null {
        return this.currentUser();
    }

    signup(payload: any): Observable<AuthResponse> {
        return this.apiService.post<AuthResponse>(apiRoutes.signup, payload);
    }

    login(payload: any): Observable<AuthResponse> {
        return this.apiService.post<AuthResponse>(apiRoutes.login, payload);
    }

    logout(): Observable<{ message: string }> {
        return this.apiService.post<{ message: string }>(apiRoutes.logout, {});
    }

    private completeValidation(authenticated: boolean): void {
        if (authenticated) {
            const userInfo = getFromStorage<User>("userInfo");
            this.setAuthState(authenticated, userInfo || undefined);
        } else {
            this.setAuthState(authenticated);
        }
        this.hasValidated.set(true);
    }

    validateAuth(): void {
        if (this.isValidating) return;
        this.isValidating = true;

        this.apiService.get(apiRoutes.validateAuth).subscribe({
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
        return this.apiService.post<{ accessToken: string }>(apiRoutes.refreshAuth, {});
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
