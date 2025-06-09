// src/app/services/theme.service.ts
import { DOCUMENT } from "@angular/common";
import { inject, Injectable, signal } from "@angular/core";

export type Theme = "dark" | "light" | "system";

@Injectable({ providedIn: "root" })
export class ThemeService {
    private readonly document = inject(DOCUMENT);
    private readonly currentThemeSignal = signal<Theme>(this.getTheme());
    readonly currentTheme = this.currentThemeSignal.asReadonly();

    constructor() {
        this.applyTheme();
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            if (this.currentThemeSignal() === "system") {
                this.applyTheme();
            }
        });
    }

    toggleTheme() {
        const current = this.currentThemeSignal();
        const newTheme = current === "light" ? "dark" : current === "dark" ? "system" : "light";
        this.setTheme(newTheme);
    }

    setTheme(theme: Theme) {
        this.currentThemeSignal.set(theme);
        this.storeTheme(theme);
        this.applyTheme();
    }

    private applyTheme() {
        const theme = this.currentThemeSignal();
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        debugger;

        const isDark = theme === "dark" || (theme === "system" && prefersDark);

        this.document.documentElement.classList.remove("dark");
        if (isDark) {
            this.document.documentElement.classList.add("dark");
        }
    }

    private storeTheme(theme: Theme) {
        localStorage.setItem("preferred-theme", theme);
    }

    private getTheme(): Theme {
        const stored = localStorage.getItem("preferred-theme");
        return stored === "dark" || stored === "light" || stored === "system" ? stored : "light";
    }
}
