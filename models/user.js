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
    profileImage:{
        type: String,
        required: false,
    },
    wheelItems: [{
        item: {
            type: String,
            required: false,
        },
        color: {
            type: String,
            required: false,
        },
        isWinningItem:{
            type: Boolean,
            required: false,
        }
    }],
    shopSlogan:{
        type: String,
        required: false,
    },
    cretaedAt: {
        type: Date,
        required: false
    },
    facebook: {
        type: String,
        required: false,
    },
    instagram: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    tiktok: {
        type: String,
        required: false,
    },
    winningProbability:{
        type: Number,
        required: false,
    },
    dashboardConfig:{
        primaryColor:{
            type: String,
            required: false,
        },
        secondaryColor:{
            type: String,
            required: false,
        },
        sloganColor:{
            type: String,
            required: false,
        },
        wheelItemTextSize:{
            type: String,
            required: false,
        },
        spinBtnColor:{
            type: String,
            required: false,
        },
        spinBtnText:{
            type: String,
            required: false,
        }
    },

})

const User = models.User || model("User", UserSchema)

export default User