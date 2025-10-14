export interface CartItem {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

export interface CheckoutResponse {
    statusCode: number;
    data: { checkout_session_url: string };
    message: string;
}

export interface VerifySessionResponse {
    statusCode: number;
    data: { session: any };
    message: string;
}
