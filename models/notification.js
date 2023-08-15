import { Schema, model, models } from "mongoose"

const NotificationSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    backColor:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    icon:{
        type: String,
        required: true
    },
    isRead:{
        type: Boolean,
        required: true
    },
    customer:{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    cretedAt: {
        type: Date,
        required: true
    },
})

const Notification = models.Notification || model("Notification", NotificationSchema)

export default Notification