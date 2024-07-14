import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    address: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true }, 
    dateOfBirth: { type: Date, required: true }, 
    phone: { type: String, required: true, unique: true }, 
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true }); // Add timestamps to automatically manage createdAt and updatedAt fields


const User = mongoose.model("User", UserSchema);

export default User;
