import { hash } from "bcryptjs"
import { connectToMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"


const handler = async (req, res) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ message: "Data is missing" })

        const { userName, email, password, phoneNumber, shopName, shopId } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(409).json({ message: "User Already exists" })
        }

        else {
            const hashedPassword = await hash(password, 12)

            const user = new User({
                userName: userName,
                email: email,
                password: hashedPassword,
                phoneNumber: phoneNumber,
                shopName: shopName,
                shopId: shopId,
                isAdmin: false,
                uid: generateRandomString(6),
                custermers: [],
                cretaedAt: new Date()
            });
            user
                .save()
                .then(result => {
                    if (result) {
                        return res.status(201).json({
                            success: true,
                            user
                        })
                    }
                }).catch(error => {
                    res.status(400).json({ message: error.message })
                });

            function generateRandomString(length) {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let randomString = '';
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    randomString += characters.charAt(randomIndex);
                }
                return randomString;
            }
        }
    }
    else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default handler