import { Component, signal } from "@angular/core";
import { ToggleThemeComponent } from "../toggle-theme/toggle-theme.component";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../../core/services/auth.service";
import { finalize } from "rxjs";
import { clearData } from "../../core/utils/localstorage";

@Component({
    selector: "app-navbar",
    imports: [ToggleThemeComponent, RouterLink, MatButtonModule],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
    constructor(
        private snackBar: MatSnackBar,
        private authService: AuthService,
    ) {}

    protected brandName = "Softaims";
    protected isSubmitting = signal(false);

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    async handleLogout(): Promise<void> {
        if (this.isSubmitting()) return;

        this.isSubmitting.set(true);

        this.authService
            .logout()
            .pipe(finalize(() => this.isSubmitting.set(false)))
            .subscribe({
                next: ({ message }: { message: string }) => {
                    this.snackBar.open(message, "Close", { duration: 3000 });
                    clearData("userInfo");

                    this.authService.setAuthState(false);
                },
                error: (error) => {
                    this.snackBar.open(error?.error?.message || "Logout failed.", "Close", {
                        duration: 3000,
                    });
                    console.error(error);
                },
                complete: () => {
                    console.log("Login successful...");
                },
            });
    }
}
