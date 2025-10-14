import { createAction, props } from "@ngrx/store";
import type { CartItem } from "../../core/types/checkout";

export const addToCart = createAction("[Cart] Add To Cart", props<{ product: CartItem }>());

export const removeFromCart = createAction(
    "[Cart] Remove From Cart",
    props<{ productId: string }>()
);

export const increaseQuantity = createAction(
    "[Cart] Increase Quantity",
    props<{ productId: string }>()
);

export const decreaseQuantity = createAction(
    "[Cart] Decrease Quantity",
    props<{ productId: string }>()
);

export const clearCart = createAction("[Cart] Clear Cart");
