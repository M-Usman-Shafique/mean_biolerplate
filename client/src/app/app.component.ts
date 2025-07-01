import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ThemeService } from "./core/services/theme.service";
import { AuthService } from "./core/services/auth.service";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, RouterModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
    readonly title = "Softaims";

    // Ensures theme initialization for all routes, including not-found and lazy loaded pages:
    constructor(
        private themeService: ThemeService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.validateSession();
    }
}
