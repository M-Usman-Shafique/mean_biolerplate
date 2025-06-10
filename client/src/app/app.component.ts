import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ThemeService } from "./core/services/theme.service";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, RouterModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    readonly title = "Softaims";

    // Ensures theme initialization for all routes, including not-found and lazy loaded pages:
    constructor(private themeService: ThemeService) {}
}
