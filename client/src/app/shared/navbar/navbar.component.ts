import { Component, inject, OnInit, Signal, signal } from "@angular/core";
import { ToggleThemeComponent } from "../toggle-theme/toggle-theme.component";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../core/services/auth.service";
import { finalize } from "rxjs";
import { clearStorage, getFromStorage } from "../../core/utils/localstorage.util";
import { NotificationService } from "../../core/services/notification.service";
import { User } from "../../core/types/auth";
import { DateTimeComponent } from "../date-time/date-time.component";

@Component({
    selector: "app-navbar",
    imports: [
        ToggleThemeComponent,
        DateTimeComponent,
        RouterLink,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
    ],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit {
    private notification = inject(NotificationService);
    private authService = inject(AuthService);
    private router = inject(Router);

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
                    clearStorage("userInfo");
                    this.authService.setAuthState(false);
                    this.notification.success(message);
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
