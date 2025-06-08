import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ThemeService } from "../../services/theme.service";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: "app-toggle-theme",
    imports: [MatButtonModule, MatIconModule],
    templateUrl: "./toggle-theme.component.html",
    styleUrl: "./toggle-theme.component.scss",
})
export class ToggleThemeComponent {
    readonly themeService = inject(ThemeService);
}
