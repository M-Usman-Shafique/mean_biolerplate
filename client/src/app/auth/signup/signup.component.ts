import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-signup",
    imports: [RouterLink, MatButtonModule],
    templateUrl: "./signup.component.html",
    styleUrl: "./signup.component.scss",
})
export class SignupComponent {}
