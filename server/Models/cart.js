import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
    cart: [
        {
            name: { type: String, required: true },
            price: { type: String, required: true },
            quan: { type: Number, required: true }
        }
    ],
    orderType: { type: String, enum: ['in-car', 'dine-in', 'pick-up', 'delivery'], required: true },
    address: { type: String},//required only if order type is delivery
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    discount: { type: Number, required: true },
    taxes: { type: Number, required: true }
});

export const Order = mongoose.model('Order', OrderSchema);
