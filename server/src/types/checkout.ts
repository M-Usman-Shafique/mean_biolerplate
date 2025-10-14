export interface CartItem {
    _id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

export interface CheckoutBody {
    cartItems: CartItem[];
    userId: string;
    totalPrice: number;
}
