import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs/operators";

export const guestGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.authReady().pipe(
        map((isLoggedIn) => {
            if (isLoggedIn) {
                router.navigate(["/"]);
            }
            return !isLoggedIn;
        })
    );
};
