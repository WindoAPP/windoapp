import { Schema, model, models } from "mongoose"

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        required: true,
    },
    cretedAt: {
        type: Date,
        required: true
    },
    giftsGiven:{
        type: Boolean,
        required: false,
    },
    spins: [{
        isWin: {
            type: Boolean,
            required: false,
        },
        price: {
            type: String,
            required: false,
        },
        created_at: {
            type: String,
            required: false,
        },
    }]
})

const Customer = models.Customer || model("Customer", CustomerSchema)

export default Customer