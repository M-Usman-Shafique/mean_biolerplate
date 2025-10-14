import { Component, inject } from "@angular/core";
import { dummyProducts } from "../../core/constants/dummy";
import type { CartItem } from "../../core/types/checkout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "../../store/cart/cart.actions";
import { selectCartItemQuantity } from "../../store/cart/cart.selectors";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "app-products",
    imports: [MatButtonModule, MatIconModule, AsyncPipe],
    templateUrl: "./products.component.html",
    styleUrl: "./products.component.scss",
})
export class ProductsComponent {
    private store = inject(Store);

    readonly products: CartItem[] = dummyProducts;

    addProductToCart(product: CartItem) {
        this.store.dispatch(addToCart({ product }));
    }

    increaseQuantity(product: CartItem) {
        this.store.dispatch(increaseQuantity({ productId: product.id }));
    }

    decreaseQuantity(product: CartItem) {
        this.store.dispatch(decreaseQuantity({ productId: product.id }));
    }

    removeProductFromCart(product: CartItem) {
        this.store.dispatch(removeFromCart({ productId: product.id }));
    }

    getCartItemQuantity(productId: string): Observable<number> {
        return this.store.select(selectCartItemQuantity(productId));
    }
}
