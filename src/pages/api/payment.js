import Stripe from "stripe";
import { env_data } from "../../../config/config";

const handler = async (req, res) => {
    // connectToMongoDB().catch(err => res.json(err))
    const {priceId,userId,total,currency} =req.body
    if (req.method === "GET") {
        const stripe = new Stripe("sk_test_51NaD0rAtxilCsn6NpGree2BvoWPklwoqVlnuvZwqSnXcVoRgoeDi4EGqvEh2hXcYUOGt0hrEHJyQisUsA8svyGiX003680C7Bq")
        const prices = await stripe.prices.list({
            limit: 4,
        });
        return res.status(201).json(prices.data.reverse())
    }

    if (req.method === "POST") {
        const stripe = new Stripe("sk_test_51NaD0rAtxilCsn6NpGree2BvoWPklwoqVlnuvZwqSnXcVoRgoeDi4EGqvEh2hXcYUOGt0hrEHJyQisUsA8svyGiX003680C7Bq");
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `${env_data.base_url}register?payment=success&uid=${userId}&total=${total}&currency=${currency}`,
            cancel_url: `${env_data.base_url}register?payment=failed&uid=${userId}&total=${total}&currency=${currency}`
        })
        console.log(session);
        return res.status(201).json({url:session.url})
    }
}

export default handler