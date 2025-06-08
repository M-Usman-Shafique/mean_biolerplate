import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ToggleThemeComponent } from "./components/toggle-theme/toggle-theme.component";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, MatButtonModule, MatIconModule, ToggleThemeComponent],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    protected title = "Softaims";
    user = "Ali";

    getUser(id) {
        console.log(this.user);
    }
}
