import { CanMatchFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const guestGuard: CanMatchFn = (route, segments) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.isAuthenticated()) {
        router.navigate(["/"]);
        return false;
    } else {
        return true;
    }
};
