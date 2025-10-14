import { inject, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class NotificationService {
    private defaultConfig: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: "start",
        verticalPosition: "bottom",
    };

    private snackBar = inject(MatSnackBar);

    show(message: string, action: string = "Close", config?: MatSnackBarConfig): void {
        this.snackBar.open(message, action, {
            ...this.defaultConfig,
            ...config,
        });
    }

    success(message: string): void {
        this.show(message);
    }

    error(message: string): void {
        this.show(message);
    }
}
