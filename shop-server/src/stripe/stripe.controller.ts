import { Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request, Response } from 'express';

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService){}
    @Post('checkout')
    async createCheckout(@Res() res: Response){
        const session = await this.stripeService.createCheckoutSession()
        return res.json({url: session.url})
    }
    @Post('webhook')
    async handleWebHook(
        @Req() req: Request,
        @Res() res: Response,
        @Headers('stripe-signature') sig: string,
    ) {
        let event;
        const secret = process.env.STRIPE_WEBHOOK!
        try {
            event = this.stripeService.constructEvent(
                req.body,
                sig,
                secret
            )
        } catch (error) {
            console.error(error.message)
            return res.status(400).send('Webhook error')
        }
        if(event.type === 'checkout.session.completed'){
            const session = event.data.object
            console.log('Payment succesful', session)
        }
        return res.json({received: true})

    }
}
