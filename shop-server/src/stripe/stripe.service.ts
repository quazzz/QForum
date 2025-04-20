import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
@Injectable()
export class StripeService {
    private stripe: Stripe;
    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET!, {
            apiVersion: '2025-03-31.basil'
        })
    }
    async createCheckoutSession() {
        return this.stripe.checkout.sessions.create({
          mode: 'payment',
          payment_method_types: ['card'], 
          line_items: [
            {
              price_data: {
                currency: 'usd',
                unit_amount: 2500,
                product_data: {
                  name: 'Cool T-Shirt',
                },
              },
              quantity: 1,
            },
          ],
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel',
        } as Stripe.Checkout.SessionCreateParams); 
      }
    constructEvent(payload: Buffer, sig: string, secret: string) {
        return this.stripe.webhooks.constructEvent(payload, sig, secret);
    }
}
