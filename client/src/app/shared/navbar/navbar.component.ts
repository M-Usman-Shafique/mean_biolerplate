import { Component } from "@angular/core";
import { ToggleThemeComponent } from "../toggle-theme/toggle-theme.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-navbar",
    imports: [ToggleThemeComponent, RouterLink],
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.scss",
})
export class NavbarComponent {
    protected brandName = "Softaims";
}
