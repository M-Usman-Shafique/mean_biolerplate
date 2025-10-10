import { Component, inject, signal } from "@angular/core";
import { dummyProducts } from "../../core/constants/dummy";
import { CartItem, CheckoutResponse } from "../../core/types/checkout";
import { NotificationService } from "../../core/services/notification.service";
import { CheckoutService } from "../../core/services/checkout.service";
import { finalize } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatBadgeModule } from "@angular/material/badge";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-products",
    imports: [MatButtonModule, MatIconModule, MatCardModule, MatBadgeModule, RouterLink],
    templateUrl: "./products.component.html",
    styleUrl: "./products.component.scss",
})
export class ProductsComponent {
    private notification = inject(NotificationService);
    private checkoutService = inject(CheckoutService);

    readonly products: CartItem[] = dummyProducts;
    readonly cart = signal<CartItem[]>([]);

    constructor() {}

    isProcessing = signal(false);

    addProductToCart(product: CartItem) {
        this.cart.update((prev) => [...prev, product]);
    }

    increaseQuantity(product: CartItem) {
        product.quantity++;
    }

    decreaseQuantity(product: CartItem) {
        if (product.quantity <= 0) {
            return;
        }
        product.quantity--;

        if (product.quantity === 0) {
            this.removeProductFromCart(product);
        }
    }

    removeProductFromCart(product: CartItem) {
        this.cart.update((prev) => prev.filter((item) => item.id !== product.id));
    }

    onCheckout() {
        if (this.cart().length === 0) {
            this.notification.error("Your cart is empty.");
            return;
        }

        const userId = "user_001";
        const totalPrice = this.cart().reduce((acc, item) => acc + item.price * item.quantity, 0);

        this.isProcessing.set(true);
        this.checkoutService
            .checkout(this.cart(), userId, totalPrice)
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
    }
}
