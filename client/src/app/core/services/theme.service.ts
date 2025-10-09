import { Injectable, computed, effect, signal } from "@angular/core";
import { Theme, ThemeOption } from "../types/theme";

const themes: Theme[] = ["light", "dark", "system"];

@Injectable({ providedIn: "root" })
export class ThemeService {
    private readonly currentTheme = signal<Theme>("system");

    private readonly themesMap: ThemeOption[] = [
        { name: "light", icon: "light_mode" },
        { name: "dark", icon: "bedtime" },
        { name: "system", icon: "computer" },
    ];

    readonly selectedTheme = computed(() =>
        this.themesMap.find((t) => t.name === this.currentTheme())
    );

    constructor() {
        const savedTheme = localStorage.getItem("prefered-theme");
        if (this.isValidTheme(savedTheme)) {
            this.currentTheme.set(savedTheme);
        }

        effect(() => {
            const theme = this.currentTheme();
            const colorScheme = theme === "system" ? "light dark" : theme;
            document.documentElement.style.setProperty("color-scheme", colorScheme);
        });
    }

    getThemes(): ThemeOption[] {
        return this.themesMap;
    }

    setTheme(theme: Theme) {
        localStorage.setItem("prefered-theme", theme);
        this.currentTheme.set(theme);
    }

    private isValidTheme(value: any): value is Theme {
        return themes.includes(value);
    }
}
