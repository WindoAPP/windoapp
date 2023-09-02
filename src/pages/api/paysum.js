import { connectToMongoDB } from "../../../lib/mongodb"
import Payment from "../../../models/payment"
import User from "../../../models/user";

const handler = async (req, res) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {

        const { user, amount_total, currency, success,accStatus } = req.body;

        if (!req.body) return res.status(400).json({ error: "Data is missing" })

        const payment = new Payment({
            user: user,
            currency: currency,
            amount_total: amount_total,
            success: success,
            cretedAt: new Date()
        });
        payment
            .save()
            .then(result => {
                if (result) {
                    User.updateOne({ _id: user }, { $push: { payments: payment._id },$set:{accStatus:accStatus} }).then(() => {
                        return res.status(201).json({
                            success: true
                        })
                    }).catch(error => {
                        return res.status(409).json({ message: error.message })
                    });
                }
            }).catch(error => {
                return res.status(409).json({ message: error.message })
            });

    } else if (req.method === "GET") {
        if (!req.query) return res.status(400).json({ error: "Data is missing" })

        const { id } = req.query;

        Payment.find({ user: id }).then((results) => {
            if (results) {
                return res.status(201).json({
                    success: true,
                    payments: results
                })
            }
        }).catch(error => {
            return res.status(409).json({ message: error.message })
        });

    } else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default handler