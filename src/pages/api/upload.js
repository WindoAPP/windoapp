import { connectToMongoDB } from '../../../lib/mongodb';
import User from '../../../models/user';
import fs from 'fs';
import path from 'path';

const handler = async (req, res) => {
    try {
        await connectToMongoDB();

        if (req.method === "POST") {
            const base64Data = req.body.base64;
            const base64EncodedImage = base64Data.replace(/^data:image\/\w+;base64,/, '');

            // Generate a unique file name (you can use any logic here)
            const fileName = `uploaded_file_${Date.now()}.png`;

            // Set the file path
            const filePath = path.join(process.cwd(), 'public/uploads', fileName);

            // Write the base64 data to the file
            fs.writeFile(filePath, base64EncodedImage, { encoding: 'base64' }, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Failed to save the file.' });
                }
                User.updateOne({ _id: req.body.user }, { $set: { profileImage: `uploads/${fileName}` } }).then(() => {
                    return res.status(200).json({ message: "Upload successfully !" });
                }).catch(err => {
                    console.log(err);
                })
            });

        } else {
            res.status(405).json({ error: "Method Not Allowed" });
        }
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default handler;