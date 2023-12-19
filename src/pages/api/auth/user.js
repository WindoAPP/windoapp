import { connectToMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"
import Customer from "../../../../models/customer"
import { hash } from "bcryptjs"
import Notification from "../../../../models/notification"


const handler = async (req, res) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "GET") {
        User.find({uid:req.query.id}).populate({ path: 'custermers', model: Customer }).then((result)=>{
            if(result){
                Notification.find({user:result[0]._id,isRead:false}).then((notifications)=>{
                    if(notifications){
                        return res.status(201).json({
                            success: true,
                            user:result[0],
                            notificationCount:notifications.length
                        })
                    }
                    
                }).catch(error => {
                    res.status(400).json({ message: error.message })
                });    
            }
        }).catch(error => {
            res.status(400).json({ message: error.message })
        });
    }
    else if(req.method === "PUT"){
        const user  =req.body;

        if(user.password){
            const hashedPassword = await hash(user.password, 12);
            if(hashedPassword){
                user.password=hashedPassword;
            }
        }

        User.updateOne({_id:user._id},user).then(result=>{
            if(result){
                return res.status(201).json({
                    success: true,
                })
            }           
        }).catch(error => {
            res.status(400).json({ message: error.message })
        });
    }else if(req.method === "POST"){

        const {email,password}  =req.body;
        User.find({email:email}).then(async (user)=>{
            if(user.length==0){
                res.status(401).json({ error: "L'utilisateur ne quitte pas" })
            }else{
                const hashedPassword = await hash(password, 12);
                User.updateOne({_id:user[0]._id},{$set: {password:hashedPassword}}).then(result=>{
                    if(result){
                        return res.status(201).json({
                            success: true,
                        })
                    }           
                }).catch(error => {
                    res.status(400).json({ message: error.message })
                });

            }
        }).catch(error => {
            res.status(400).json({ message: error.message })
        });

    }
    else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default handler