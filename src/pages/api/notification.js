import { connectToMongoDB } from "../../../lib/mongodb"
import Customer from "../../../models/customer"
import Notification from "../../../models/notification"

const handler = async (req, res) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {

        if (!req.body) return res.status(400).json({ error: "Data is missing" })

        const { backColor, user, body, icon, customer } = req.body

        const notification = new Notification({
            backColor: backColor,
            user: user,
            body: body,
            icon: icon,
            customer: customer,
            isRead: false,
            cretedAt: new Date()
        });
        notification
            .save()
            .then(result => {
                if (result) {

                    return res.status(201).json({
                        success: true,
                        notification: notification
                    })
                }
            }).catch(error => {
                return res.status(409).json({ message: error.message })
            });


    } else if (req.method === "GET") {
        if (!req.query) return res.status(400).json({ error: "Data is missing" })

        const { id } = req.query;

        Notification.find({ user: id }).populate({ path: 'customer', model: Customer }).sort({ cretedAt: -1 }).then((results) => {
            if (results) {
                return res.status(201).json({
                    success: true,
                    notifications: results
                })
            }
        }).catch(error => {
            return res.status(409).json({ message: error.message })
        });
    } else if (req.method === "PUT") {
        const { id } = req.query;

        Notification.updateMany({ user: id }, { $set: { isRead: true } }).then(result => {
            if (result) {
                return res.status(201).json({
                    success: true,
                })
            }
        }).catch(error => {
            res.status(400).json({ message: error.message })
        });
    } else if (req.method === "DELETE") {
        const { id } = req.query;

        Notification.deleteOne({ _id: id }).then(result => {
            if (result) {
                return res.status(201).json({
                    success: true,
                })
            }
        }).catch(error => {
            res.status(400).json({ message: error.message })
        });

    } else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default handler