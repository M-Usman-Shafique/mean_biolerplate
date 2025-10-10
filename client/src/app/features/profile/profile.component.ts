import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-profile",
    imports: [RouterLink, MatButtonModule],
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
})
export class ProfileComponent {}
