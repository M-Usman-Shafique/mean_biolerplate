import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject, signal } from "@angular/core";
import { clearStorage } from "../utils/localstorage.util";
import { NotificationService } from "../services/notification.service";

let refreshInProgress = signal(false);

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
    const notification = inject(NotificationService);

    return next(req).pipe(
        catchError((error) => {
            if (error.status === 401 && authService.isLoggedIn()) {
                console.warn("Session expired, trying refresh via interceptor...");
                return handleUnauthorizedError(req, next, error, authService, notification);
            } else {
                return throwError(() => error);
            }
        })
    );
};

const handleUnauthorizedError = (
    req: HttpRequest<any>,
    next: HttpHandlerFn,
    originalError: any,
    authService: AuthService,
    notification: NotificationService
) => {
    if (!refreshInProgress()) {
        refreshInProgress.set(true);

        return authService.refreshAuth().pipe(
            switchMap(() => {
                console.log("Session refreshed via Interceptor. Try again...");
                refreshInProgress.set(false);

                return next(req);
            }),
            catchError((error) => {
                refreshInProgress.set(false);
                notification.error("Session expired. Logging you out...");
                clearStorage("userInfo");
                authService.setAuthState(false);
                console.error("Error during session refresh via Interceptor:", error);
                return throwError(() => originalError);
            })
        );
    } else {
        return next(req);
    }
};
