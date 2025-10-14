import { Component, inject, signal } from "@angular/core";
import { NotificationService } from "../../core/services/notification.service";
import { CheckoutService } from "../../core/services/checkout.service";
import { finalize, take } from "rxjs";
import { CheckoutResponse } from "../../core/types/checkout";
import { Store } from "@ngrx/store";
import { ProductsComponent } from "../../shared/products/products.component";
import {
    selectCartItems,
    selectCartTotalItems,
    selectCartTotalPrice,
    selectIsCartEmpty,
} from "../../store/cart/cart.selectors";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatBadgeModule } from "@angular/material/badge";
import { AsyncPipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../core/services/auth.service";

@Component({
    selector: "app-checkout",
    imports: [
        ProductsComponent,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        RouterLink,
        AsyncPipe,
    ],
    templateUrl: "./checkout.component.html",
    styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent {
    private authService = inject(AuthService);
    private notification = inject(NotificationService);
    private checkoutService = inject(CheckoutService);
    private store = inject(Store);

    isProcessing = signal(false);

    readonly cartItems$ = this.store.select(selectCartItems);
    readonly cartTotalItems$ = this.store.select(selectCartTotalItems);
    readonly cartTotalPrice$ = this.store.select(selectCartTotalPrice);
    readonly isCartEmpty$ = this.store.select(selectIsCartEmpty);

    onCheckout() {
        this.isCartEmpty$.pipe(take(1)).subscribe((isEmpty) => {
            if (isEmpty) {
                this.notification.error("Your cart is empty.");
                return;
            }

            this.cartItems$.pipe(take(1)).subscribe((cartItems) => {
                this.cartTotalPrice$.pipe(take(1)).subscribe((totalPrice) => {
                    const user = this.authService.getCurrentUser();
                    const userId = user?._id;

                    if (!userId || user.role !== "user") {
                        this.notification.error("Invalid rights for checkout.");
                        return;
                    }

                    this.isProcessing.set(true);
                    this.checkoutService
                        .checkout(cartItems, userId, totalPrice)
                        .pipe(finalize(() => this.isProcessing.set(false)))
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
                });
            });
        });
    }
}
