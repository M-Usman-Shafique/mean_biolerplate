import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { NotificationService } from "../../core/services/notification.service";
import { CheckoutService } from "../../core/services/checkout.service";
import { finalize } from "rxjs";
import { CheckoutResponse } from "../../core/types/checkout";
import { dummyCart } from "../../core/constants/dummy";

@Component({
    selector: "app-dashboard",
    imports: [RouterLink, MatButtonModule],
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
    private notification = inject(NotificationService);
    private checkoutService = inject(CheckoutService);

    constructor() {}

    isWaiting = signal(false);

    onCheckout() {
        const userId = "user_001";
        const totalPrice = dummyCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

        this.isWaiting.set(true);
        this.checkoutService
            .checkout(dummyCart, userId, totalPrice)
            .pipe(finalize(() => this.isWaiting.set(false)))
            .subscribe({
                next: (res: CheckoutResponse) => {
                    console.log("Checkout successful:", res);
                    if (res.data.checkout_session_url) {
                        window.location.href = res.data.checkout_session_url;
                    }
                },
                error: (err) => {
                    console.error("Checkout failed:", err);
                    this.notification.error(err.error?.message || "Checkout failed.");
                },
            });
    }
}
