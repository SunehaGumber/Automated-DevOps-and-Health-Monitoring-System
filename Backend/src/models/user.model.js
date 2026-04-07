import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: [true, "Email must be unique"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
        lowercase:[true,"email address characters must be in lower case."]
    },
    username: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "username should be unique."],
    },
    password: {
        type: String,
        min: 6,
        required: [true, "password is required."],
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps:true
})

const userModel = mongoose.model('user', userSchema);
export default userModel;