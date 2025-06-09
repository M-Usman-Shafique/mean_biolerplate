import { Injectable, computed, effect, signal } from "@angular/core";

export type Theme = "dark" | "light" | "system";
export interface ThemeOption {
    name: Theme;
    icon: string;
}
const validThemes: Theme[] = ["light", "dark", "system"];

@Injectable({ providedIn: "root" })
export class ThemeService {
    private readonly currentTheme = signal<Theme>("system");

    private readonly themes: ThemeOption[] = [
        { name: "light", icon: "light_mode" },
        { name: "dark", icon: "bedtime" },
        { name: "system", icon: "computer" },
    ];

    readonly selectedTheme = computed(() =>
        this.themes.find((t) => t.name === this.currentTheme())
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
        return this.themes;
    }

    setTheme(theme: Theme) {
        localStorage.setItem("prefered-theme", theme);
        this.currentTheme.set(theme);
    }

    private isValidTheme(value: any): value is Theme {
        return validThemes.includes(value);
    }
}
