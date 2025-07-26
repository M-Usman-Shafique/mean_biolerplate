import { Component, OnInit, Signal, signal } from "@angular/core";
import { ToggleThemeComponent } from "../toggle-theme/toggle-theme.component";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../core/services/auth.service";
import { finalize } from "rxjs";
import { clearStorage, getFromStorage } from "../../core/utils/localstorage.util";
import { NotificationService } from "../../core/services/notification.service";
import { User } from "../../core/constants/types";

@Component({
    selector: "app-navbar",
    imports: [ToggleThemeComponent, RouterLink, MatButtonModule, MatMenuModule, MatIconModule],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit {
    constructor(
        private notification: NotificationService,
        private authService: AuthService,
        private router: Router
    ) {}

    protected brandName = "Softaims";
    protected isSubmitting = signal(false);
    protected isLoggedIn!: Signal<boolean>;
    protected userInfo!: User | null;

    ngOnInit(): void {
        this.isLoggedIn = this.authService.isAuthenticated;
        this.userInfo = getFromStorage("userInfo");
    }

    async handleLogout(): Promise<void> {
        if (this.isSubmitting()) return;

        this.isSubmitting.set(true);

        this.authService
            .logout()
            .pipe(finalize(() => this.isSubmitting.set(false)))
            .subscribe({
                next: ({ message }: { message: string }) => {
                    this.notification.success(message);
                    clearStorage("userInfo");
                    this.authService.setAuthState(false);
                    this.router.navigate(["/login"]);
                },
                error: (error) => {
                    this.notification.error(error.error?.message || "Logout failed.");
                    console.error(error);
                },
                complete: () => {
                    console.log("Logout successful...");
                },
            });
    }
}
