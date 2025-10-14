import Stripe from "stripe";
import { STRIPE } from "../configs/config";

const stripe = new Stripe(STRIPE.SECRET_KEY);

export default stripe;
