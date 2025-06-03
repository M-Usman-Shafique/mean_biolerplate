import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from '../../services/theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-theme',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.scss'
})
export class ToggleTheme {
  readonly themeService = inject(ThemeService);
}