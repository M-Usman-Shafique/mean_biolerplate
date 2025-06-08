import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { counterComponent } from "../components/counter/counter.component";

@Component({
    selector: "app-home",
    imports: [counterComponent, MatButtonModule, MatIconModule],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    protected title = "Homepage";
}
