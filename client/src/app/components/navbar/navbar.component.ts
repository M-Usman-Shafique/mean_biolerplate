import { Component } from '@angular/core';
import { ToggleThemeComponent } from "../toggle-theme/toggle-theme.component";

@Component({
  selector: 'app-navbar',
  imports: [ToggleThemeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected brandName = "Softaims";

}
