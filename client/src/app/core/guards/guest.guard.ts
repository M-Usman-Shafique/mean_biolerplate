import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map, tap } from "rxjs/operators";

export const guestGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.waitForSessionValidation().pipe(
        tap((isLoggedIn) => {
            if (isLoggedIn) {
                router.navigate(["/"]);
            }
        }),
        map((isLoggedIn) => !isLoggedIn)
    );
};
