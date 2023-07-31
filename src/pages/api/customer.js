import { connectToMongoDB } from "../../../lib/mongodb"
import Customer from "../../../models/customer"
import User from "../../../models/user"

const handler = async (req, res) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {

        if (!req.body) return res.status(400).json({ error: "Data is missing" })

        const { name, user, phoneNumber,email,instagram,facebook } = req.body
        Customer.find({email:email}).then((cus)=>{
            console.log(cus.length);
            if(cus.length==0){
                const gust = new Customer({
                    name: name,
                    user: user,
                    phoneNumber: phoneNumber,
                    email:email,
                    instagram: instagram,
                    facebook:facebook,
                    cretedAt: new Date()
                });
                gust
                    .save()
                    .then(result => {
                        if(result){
                            User.updateOne({_id:user},{ $push: { custermers: gust._id }}).then(()=>{
                                return res.status(201).json({
                                    success: true,
                                    gust:gust
                                })
                            }).catch(error => {
                                return res.status(409).json({ message: error.message })
                            });       
                        }      
                    }).catch(error => {
                        return res.status(409).json({ message: error.message })
                    });
            }else{
                return res.status(201).json({
                    success: true,
                    gust:cus[0]
                })
            }

        }).catch(error => {
            return res.status(409).json({ message: error.message })
        });
        
    } else if (req.method === "GET") {
        if (!req.query) return res.status(400).json({ error: "Data is missing" })

        const { id } = req.query;

        Customer.find({user:id}).then((results)=>{
            if(results){
                return res.status(201).json({
                    success: true,
                    customers:results
                })
            }
        }).catch(error => {
            return res.status(409).json({ message: error.message })
        });
    } else if (req.method === "PUT") {
        const customer  =req.body;

        Customer.updateOne({_id:customer._id},customer).then(result=>{
            if(result){
                return res.status(201).json({
                    success: true,
                })
            }           
        }).catch(error => {
            res.status(400).json({ message: error.message })
        });
    }else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default handler