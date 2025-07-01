import { inject, Injectable, signal } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ApiService } from "./api.service";
import { apiRoutes } from "../../config/routes.config";
import { AuthResponse } from "../constants/types";
import { clearStorage } from "../utils/localstorage";
import { map, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
    private api = inject(ApiService);
    isAuthenticated = signal(false);
    private hasValidated = false;
    private sessionValidated = signal(false);
    private sessionValidatedSubject = new Subject<boolean>();

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

    validateSession(): void {
        if (this.hasValidated) return;
        this.hasValidated = true;

        this.api.get(apiRoutes.validateSession).subscribe({
            next: () => {
                this.setAuthState(true);
                this.sessionValidated.set(true);
                this.sessionValidatedSubject.next(true);
            },
            error: () => {
                console.warn("Session expired, trying refresh...");
                this.refreshSession().subscribe({
                    next: () => {
                        console.log("Session refreshed successfully.");
                        this.setAuthState(true);
                        this.sessionValidated.set(true);
                        this.sessionValidatedSubject.next(true);
                    },
                    error: () => {
                        console.error("Session could not be refreshed. Please log in again.");
                        clearStorage("userInfo");
                        this.setAuthState(false);
                        this.sessionValidated.set(true);
                        this.sessionValidatedSubject.next(true);
                    },
                });
            },
        });
    }

    refreshSession(): Observable<{ accessToken: string }> {
        return this.api.post<{ accessToken: string }>(apiRoutes.refreshSession, {});
    }

    waitForSessionValidation(): Observable<boolean> {
        if (this.sessionValidated()) {
            return new Observable<boolean>((observer) => {
                observer.next(this.isAuthenticated());
                observer.complete();
            });
        } else {
            return this.sessionValidatedSubject.asObservable().pipe(
                map(() => this.isAuthenticated()),
                take(1)
            );
        }
    }
}
