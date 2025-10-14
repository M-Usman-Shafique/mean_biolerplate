import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { apiRoutes } from "../../config/routes.config";
import { Observable } from "rxjs";
import { CartItem, CheckoutResponse, VerifySessionResponse } from "../types/checkout";

@Injectable({
    providedIn: "root",
})
export class CheckoutService {
    private apiService = inject(ApiService);

    checkout(
        cartItems: CartItem[],
        userId: string,
        totalPrice: number
    ): Observable<CheckoutResponse> {
        const payload = { cartItems, userId, totalPrice };
        return this.apiService.post<CheckoutResponse>(apiRoutes.checkout, payload);
    }

    verifySession(sessionId: string): Observable<VerifySessionResponse> {
        return this.apiService.post<VerifySessionResponse>(apiRoutes.verifyStripeSession, {
            sessionId,
        });
    }
}
