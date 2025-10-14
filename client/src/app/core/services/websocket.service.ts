import { Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class WebsocketService {
    private socket: Socket | null = null;

    constructor() {
        if (environment.useWebSocket) {
            this.socket = io(environment.apiUrl);
        }
    }
}
