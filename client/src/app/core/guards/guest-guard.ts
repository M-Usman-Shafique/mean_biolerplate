import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { getData } from "../utils/localstorage";

export const guestGuard: CanActivateFn = (route, segments) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const user = getData("userInfo");

    authService.setAuthState(!!user);

    if (authService.isLoggedIn()) {
        router.navigate(["/"]);
        return false;
    } else {
        return true;
    }
};
