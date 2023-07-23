import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    userName: {
        type: String,
        required: [true, "Full name is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    phoneNumber: {
        type: String,
        required: [true, "Password is required"],
    },
    custermers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        }
    ],
    shopId: {
        type: String,
        required: true,
    },
    shopName: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    wheelItems: [{
        item: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    }],
    cretaedAt: {
        type: Date,
        required: false
    }
})

const User = models.User || model("User", UserSchema)

export default User