// src/app/components/toggle-theme/toggle-theme.component.ts
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ThemeService } from "../../core/services/theme.service";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TitleCasePipe } from "@angular/common";

@Component({
    selector: "app-toggle-theme",
    imports: [MatButtonModule, MatIconModule, MatTooltipModule, TitleCasePipe],
    templateUrl: "./toggle-theme.component.html",
    styleUrl: "./toggle-theme.component.scss",
})
export class ToggleThemeComponent {
    readonly themeService = inject(ThemeService);

    readonly selectedTheme = this.themeService.selectedTheme;
    readonly themes = this.themeService.getThemes();

    cycleTheme() {
        const currentTheme = this.selectedTheme();
        const index = this.themes.findIndex((t) => t.name === currentTheme?.name);
        if (index === -1) return;
        const nextTheme = this.themes[(index + 1) % this.themes.length];
        this.themeService.setTheme(nextTheme?.name);
    }
}
