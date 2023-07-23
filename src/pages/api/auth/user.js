import { connectToMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"


const handler = async (req, res) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "GET") {
        User.find({uid:req.query.id}).then((result)=>{
            if(result){
                return res.status(201).json({
                    success: true,
                    user:result[0]
                })
            }
        }).catch(error => {
            res.status(400).json({ message: error.message })
        });
    }
    else if(req.method === "PUT"){
        const user  =req.body;

        User.updateOne({_id:user._id},user).then(result=>{
            if(result){
                return res.status(201).json({
                    success: true,
                })
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