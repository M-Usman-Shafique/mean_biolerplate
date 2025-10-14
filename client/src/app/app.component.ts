import { Component, inject, OnInit } from "@angular/core";
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
    private themeService = inject(ThemeService);
    private authService = inject(AuthService);
    private websocketService = inject(WebsocketService);

    constructor() {}

    ngOnInit(): void {
        this.authService.validateAuth();
    }
}
