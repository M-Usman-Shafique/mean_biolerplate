import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { ThemeService } from "./core/services/theme.service";
import { AuthService } from "./core/services/auth.service";
import { WebsocketService } from "./core/services/websocket.service";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, RouterModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
    readonly title = "Softaims";

    constructor(
        private themeService: ThemeService,
        private authService: AuthService,
        private websocketService: WebsocketService
    ) {}

    ngOnInit(): void {
        this.authService.validateAuth();
    }
}
