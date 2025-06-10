import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { counterComponent } from "../../shared/counter/counter.component";
import { RouterLink } from "@angular/router";
import { DateTimeComponent } from "../../shared/date-time/date-time.component";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [RouterLink, counterComponent, DateTimeComponent, MatButtonModule, MatIconModule],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    readonly title = "Homepage";
}
