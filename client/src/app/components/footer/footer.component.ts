import { Component } from "@angular/core";
import { ToggleThemeComponent } from "../toggle-theme/toggle-theme.component";

@Component({
    selector: "app-footer",
    imports: [ToggleThemeComponent],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.scss",
})
export class Footer {}
