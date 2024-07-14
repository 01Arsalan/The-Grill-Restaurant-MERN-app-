import User from "../Models/user.js";
import { Order } from "../Models/cart.js";
import Razorpay from "razorpay"

const order = async (req, res) => {
    try {
        const { _id: userId, cart, orderType, address, totalAmount, discount, taxes } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newOrder = new Order({ cart, orderType, address, totalAmount, discount, taxes });
        const savedOrder = await newOrder.save();

        user.orders.push(savedOrder.id);
        await user.save();

        res.status(200).json({ message: 'Order added successfully', order: savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing the order' });
    }
};

const fetchOrders = async (req, res) => {
    try {
        const { userId } = req.query;

        const user = await User.findById(userId).populate('orders');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const orders = user.orders.map(order => ({
            id: order._id.toString(),
            items: order.cart.map(item => ({
                name: item.name,
                price: item.price,
                quan: item.quan
            })),
            date: order.orderDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }),
            total: order.totalAmount,
            address: order.address,
            orderType: order.orderType,
            order_no: order._id.toString(),
            discount: `₹${order.discount}`,
            taxes: `₹${order.taxes}`,
            total_amount: `₹${order.totalAmount}`
        }));

        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching orders' });
    }
};

const createOrder = async (req, res) => {

    const { totalAmount: amount, receipt } = req.body;

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY_ID,
        key_secret: process.env.RAZORPAY_API_KEY_SECRET
    });

    const options = {
        amount: parseInt(amount)*100,
        currency: "INR",
        receipt,
    };

    try {
        const order = await razorpay.orders.create(options); 

        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error); 
        res.status(500).send(error); 
    }
};



export { order, createOrder, fetchOrders };

