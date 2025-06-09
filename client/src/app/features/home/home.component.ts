import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { counterComponent } from "../../shared/counter/counter.component";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-home",
    imports: [counterComponent, RouterLink ,MatButtonModule, MatIconModule],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    protected title = "Homepage";
}
