import { Injectable, computed, effect, signal } from "@angular/core";

export interface ThemeOption {
    name: Theme;
    icon: string;
}

export type Theme = "dark" | "light" | "system";

const validThemes: Theme[] = ["light", "dark", "system"];

@Injectable({
    providedIn: "root",
})
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

    getThemes(): ThemeOption[] {
        return this.themes;
    }

    setTheme(theme: Theme) {
        localStorage.setItem("prefered-theme", theme);
        this.currentTheme.set(theme);
    }

    constructor() {
        const savedTheme = localStorage.getItem("prefered-theme");
        if (this.isValidTheme(savedTheme)) {
            this.currentTheme.set(savedTheme);
        }

        effect(() => {
            const theme = this.currentTheme();
            const body = document.body;

            body.classList.remove(...validThemes);
            body.classList.add(theme);

            const colorScheme = theme === "system" ? "light dark" : theme;
            body.style.setProperty("color-scheme", colorScheme);
        });
    }

    private isValidTheme(value: any): value is Theme {
        return validThemes.includes(value);
    }
}
