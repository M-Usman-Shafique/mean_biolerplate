import stripe from "../services/stripe";
import { ApiResponse } from "../utils/ApiResponse";
import { CLIENT_URL } from "../configs/config";
import { ApiError } from "../utils/ApiError";
import { Request, Response } from "express";
import type { CheckoutBody } from "../types/checkout";

export const checkout = async (req: Request<object, object, CheckoutBody>, res: Response) => {
    const { cartItems, userId, totalPrice } = req.body;

    try {
        const products = cartItems.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.title,
                    images: [item.image],
                    metadata: {
                        productId: item._id,
                        userId,
                    },
                },
                unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: products,
            mode: "payment",
            success_url: `${CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${CLIENT_URL}/dashboard`,
            metadata: {
                userId,
                totalPrice: totalPrice.toFixed(2),
            },
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { checkout_session_url: session.url },
                    "Successfully checked out."
                )
            );
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Checkout failed. Please try again later.");
    }
};

export const verifyStripeSession = async (req: Request, res: Response) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        throw new ApiError(400, "Session ID is required.");
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
        throw new ApiError(404, "Stripe session not found.");
    }
    res.status(200).json(new ApiResponse(200, { session }, "Stripe session verified."));
};
