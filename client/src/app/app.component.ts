import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { Footer } from "./components/footer/footer.component";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, RouterModule, NavbarComponent, Footer],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    protected title = "Softaims";
}
