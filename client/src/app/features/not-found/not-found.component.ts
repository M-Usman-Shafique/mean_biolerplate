import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-not-found",
    imports: [RouterLink, MatButtonModule],
    templateUrl: "./not-found.component.html",
    styleUrl: "./not-found.component.scss",
})
export class NotFoundComponent {}
