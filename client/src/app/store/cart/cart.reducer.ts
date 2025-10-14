import { createReducer, on } from "@ngrx/store";
import type { CartItem } from "../../core/types/checkout";
import {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} from "./cart.actions";

export interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

export const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { product }) => ({
        ...state,
        items: [...state.items, { ...product, quantity: 1 }],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
    })),
    on(removeFromCart, (state, { productId }) => {
        const itemToRemove = state.items.find((item) => item.id === productId);
        if (!itemToRemove) return state;

        return {
            ...state,
            items: state.items.filter((item) => item.id !== productId),
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.quantity,
        };
    }),
    on(increaseQuantity, (state, { productId }) => {
        const item = state.items.find((item) => item.id === productId);
        if (!item) return state;

        return {
            ...state,
            items: state.items.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            ),
            totalItems: state.totalItems,
            totalPrice: state.totalPrice + item.price,
        };
    }),
    on(decreaseQuantity, (state, { productId }) => {
        const item = state.items.find((item) => item.id === productId);
        if (!item) return state;

        if (item.quantity <= 1) {
            return {
                ...state,
                items: state.items.filter((item) => item.id !== productId),
                totalItems: state.totalItems - 1,
                totalPrice: state.totalPrice - item.price * item.quantity,
            };
        }

        return {
            ...state,
            items: state.items.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ),
            totalItems: state.totalItems,
            totalPrice: state.totalPrice - item.price,
        };
    }),
    on(clearCart, () => initialState)
);
