import { connectToMongoDB } from "../../../lib/mongodb"
import Customer from "../../../models/customer"
import User from "../../../models/user"

const handler = async (req, res) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "GET") {

        if (!req.query) return res.status(400).json({ error: "Data is missing" })

        const { type } = req.query;

        if(type=="user"){
            User.find().then((results) => {
                if (results) {
                    return res.status(201).json({
                        success: true,
                        userList: results
                    })
                }
            }).catch(error => {
                return res.status(409).json({ message: error.message })
            });
        }else if(type=="customer"){

            Customer.find().then((results) => {
                if (results) {
                    return res.status(201).json({
                        success: true,
                        customerList: results
                    })
                }
            }).catch(error => {
                return res.status(409).json({ message: error.message })
            });

        }

        

    }else if (req.method === "DELETE"){

        if (!req.query) return res.status(400).json({ error: "Data is missing" })

        const { id } = req.query;

        User.deleteOne({_id:id}).then((results) => {
            if (results) {
                return res.status(201).json({
                    success: true,
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