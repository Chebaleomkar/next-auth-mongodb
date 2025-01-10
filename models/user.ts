import mongoose, { model } from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        image: { type: String },  
        role: { type: String, default: 'user' },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const userModel = mongoose.models.User || model("User", UserSchema);
export default  userModel;