import Stripe from "stripe";
import { env_data } from "../../../config/config";

const handler = async (req, res) => {
    // connectToMongoDB().catch(err => res.json(err))
    const {priceId,userId,total,currency} =req.body
    if (req.method === "GET") {
        const stripe = new Stripe("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")
        const prices = await stripe.prices.list({
            limit: 4,
        });
        return res.status(201).json(prices.data.reverse())
    }

    if (req.method === "POST") {
        const stripe = new Stripe("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");
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            success_url: `${env_data.base_url}register?payment=success&uid=${userId}&total=${total}&currency=${currency}`,
            cancel_url: `${env_data.base_url}register?payment=failed&uid=${userId}&total=${total}&currency=${currency}`
        })
        return res.status(201).json({url:session.url})
    }
}

export default handler