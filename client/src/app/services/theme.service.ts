// theme.service.ts
import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly currentThemeSignal = signal<Theme>('light');
  readonly currentTheme = this.currentThemeSignal.asReadonly();

  constructor() {
    this.setTheme(this.getStoredTheme() || 'light');
  }

  toggleTheme() {
    const newTheme = this.currentThemeSignal() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme) {
    this.currentThemeSignal.set(theme);

    if (theme === 'dark') {
      this.document.documentElement.classList.toggle('dark');
    } else {
      this.document.documentElement.classList.toggle('dark');
    }

    this.storeTheme(theme);
  }

  private storeTheme(theme: Theme) {
    localStorage.setItem('preferred-theme', theme);
  }

  private getStoredTheme(): Theme | null {
    const stored = localStorage.getItem('preferred-theme');
    return stored === 'dark' || stored === 'light' ? stored : null;
  }
}
