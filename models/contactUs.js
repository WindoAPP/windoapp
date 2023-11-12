import { Schema, model, models } from "mongoose"

const ContactUsSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    termsCheck: {
        type: Boolean,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    cretedAt: {
        type: Date,
        required: true
    },
})

const ContactUs = models.ContactUs || model("ContactUs", ContactUsSchema)

export default ContactUs