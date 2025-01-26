import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        profilePic: {
            type: String,
            default: ""
        },
        location: {
            city: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        phone: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema)

export default User;