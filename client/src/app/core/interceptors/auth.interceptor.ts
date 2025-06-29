import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject, signal } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { clearData } from "../utils/localstorage";

let isRefreshingToken = signal(false);

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
    const _snackBar = inject(MatSnackBar);

    return next(req).pipe(
        catchError((error) => {
            if (error.status === 401) {
                return handleUnauthorizedError(req, next, error, authService, _snackBar);
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
    _snackBar: MatSnackBar
) => {
    if (!isRefreshingToken()) {
        isRefreshingToken.set(true);

        return authService.refreshToken().pipe(
            switchMap(() => {
                _snackBar.open("Tokens refreshed. Try again...");
                isRefreshingToken.set(false);

                return next(req);
            }),
            catchError((error) => {
                isRefreshingToken.set(false);
                _snackBar.open("Session expired. Logging you out...");
                clearData("userInfo");
                authService.setAuthState(false);
                console.error("Error during token refresh:", error);
                return throwError(() => originalError);
            })
        );
    } else {
        return next(req);
    }
};
