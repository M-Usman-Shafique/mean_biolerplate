// src/app/core/services/auth.service.ts
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private tokenKey = "access_token";

    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    login(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
}
