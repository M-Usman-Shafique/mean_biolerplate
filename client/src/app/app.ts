import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToggleTheme } from "./components/toggle-theme/toggle-theme";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, ToggleTheme],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Softaims';
}
