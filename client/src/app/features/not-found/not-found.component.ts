import { Component, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
    selector: "app-not-found",
    imports: [RouterLink, MatButtonModule],
    templateUrl: "./not-found.component.html",
    styleUrl: "./not-found.component.scss",
})
export class NotFoundComponent implements OnInit {
    private route = inject(ActivatedRoute);

    title = "404 - Page Not Found";
    message = "The page you’re looking for doesn’t exist.";

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const error = params["error"];

            switch (error) {
                case "access_denied":
                    this.title = "Access Denied";
                    this.message = "You do not have permission to view this page.";
                    break;

                case "unauthorized":
                    this.title = "Unauthorized";
                    this.message = "You must be logged in to view this page.";
                    break;

                case "no_session_id":
                    this.title = "404 - Page Not Found";
                    this.message = "The session is invalid or has expired.";
                    break;

                default:
                    this.title = "404 - Page Not Found";
                    this.message = "The page you’re looking for doesn’t exist.";
            }
        });
    }
}
