import { env_data } from "../../../config/config";
import { transporter } from "../../../config/nodemailer";
import ContactUs from "../../../models/contactUs";

const CONTACT_MESSAGE_FIELDS = {
    name: "Nom",
    email: "Email",
    subject: "Titre",
    message: "Message",
};

const generateEmailContent = (data) => {
    const stringData = Object.entries(data).reduce(
        (str, [key, val]) =>
            (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
        ""
    );

    return {
        text: stringData,
        html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> 
        <p>Nous vous sommes reconnaissants d'avoir pris le temps de remplir notre formulaire. Votre demande est en cours de traitement. Un technicien qualifié de Windo sera à votre disposition pour vous assister dans les 24 heures à venir.</p>
<p>Nous vous remercions de votre patience et de votre confiance. N'hésitez pas à nous contacter si vous avez des questions supplémentaires.</p>
<p>Cordialement,</p>
<p>L'équipe de Windo</p>
        </body></html>`,
    };
};

const handler = async (req, res) => {
    if (req.method === "POST") {
        const data = req.body;

        const contactUs = new ContactUs({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            termsCheck: true,
            companyName: data.companyName,
            cretedAt: new Date()
        });
        contactUs
            .save()
            .then(async result => {
                if (result) {
                    try {

                        var mailOptions = {
                            from: "support@windo-web.com",
                            to: data.email,
                        };
                        await transporter.sendMail({
                            ...mailOptions,
                            ...generateEmailContent(data),
                            subject: `Hello ${data.firstName}`,
                        });

                        return res.status(200).json({ success: true });
                    } catch (err) {
                        console.log(err);
                        return res.status(400).json({ message: err.message });
                    }



                }
            }).catch(error => {
                console.log(error);
                return res.status(409).json({ message: error.message })
            });

    }
};
export default handler;