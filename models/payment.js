import { Schema, model, models } from "mongoose"

const PaymentSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount_total: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    success:{
        type: Boolean,
        required: true
    },
    cretedAt: {
        type: Date,
        required: true
    },
})

const Payment = models.Payment || model("Payment", PaymentSchema)

export default Payment