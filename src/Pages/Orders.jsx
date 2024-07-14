import "@/assets/Styles/orders.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";

const Orders = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const userId = useSelector(state => state.user.user._id);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        const applyCSSChanges = () => {
            const nav = document.querySelector('.navbar');
            document.querySelector('.owned').classList.add("to-bottom");
            if (nav) nav.classList.remove("scrolled-navbar");
        };

        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/order/fetchOrders?userId=${userId}`);
                setOrders(response.data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
        applyCSSChanges();

        return () => {
            window.removeEventListener('resize', handleResize);
            const nav = document.querySelector('.navbar');
            // document.querySelector('.owned').classList.remove("to-bottom");// here when i navigate from this componernt to a component that does not have owned component. it wont find the component, and null value does noty have a class List property and hence the erroe
            if (nav) nav.classList.add("scrolled-navbar");
        };
    }, [userId]);

    const handleOrderClick = (order) => setSelectedOrder(order);

    const handleBackClick = () => setSelectedOrder(null);

    return (
        <div className="orders container">
            <div className="orders-header">
                <Link to="/"><i className="bi bi-arrow-left"></i></Link>
                <h3>YOUR ORDERS</h3>
                <i className="bi bi-bag-check"></i>
            </div>
            {!selectedOrder ? (
                <section className="order-tiles">
                    {orders.map(order => (
                        <div key={order.id} className="tile" onClick={() => handleOrderClick(order)}>
                            <div className="details details-1">
                                <img className="img" src="https://res.cloudinary.com/didlzqvsh/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1717422617/FoodCamp/bgu9y1k38ur5yfsvdphg.png" alt="Food" />
                                <p className="name">{order.items[0].name + "..."}</p>
                            </div>
                            <div className="details details-2">
                                {width >= 400 && <p className="date">{order.date}</p>}
                                <p className="total">{order.total}</p>
                            </div>
                        </div>
                    ))}
                </section>
            ) : (
                <section className="order-detail">
                    <div className="detail-tile">
                        <button onClick={handleBackClick} className="back-btn">Back to Orders</button>
                        <div className="order-id">
                            <p>Order Id :</p>
                            <p className="p-1">{selectedOrder.order_no}</p>
                        </div>
                        <div className="order-name">
                            <p>Items :</p>
                            <div className="order-items">
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="item">
                                        <p className="p-1">{item.name}</p>
                                        <div>
                                            <p className="p-2">{item.quan < 10 ? `0${item.quan}` : item.quan}</p>
                                            <p className="p-2">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {selectedOrder.orderType === "delivery" && (
                            <div className="detail-info">
                                <p>Address</p>
                                <p className="p-1">{selectedOrder.address}</p>
                            </div>
                        )}
                        <div className="detail-info">
                            <p className="order-type">Order Type</p>
                            <p className="p-1" style={{ textTransform: "capitalize" }}>{selectedOrder.orderType}</p>
                        </div>
                        <div className="detail-info">
                            <p className="date">Date</p>
                            <p className="p-1">{selectedOrder.date}</p>
                        </div>
                        <div className="price-detail">
                            <div className="flex-row">
                                <p className="discount">Discount :</p>
                                <p className="p-1">{selectedOrder.discount}</p>
                            </div>
                            <div className="flex-row">
                                <p className="taxes">Taxes :</p>
                                <p className="p-1">{selectedOrder.taxes}</p>
                            </div>
                            <div className="flex-row">
                                <p className="total-amount">Total Amount :</p>
                                <p className="p-1">{selectedOrder.total_amount}</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Orders;
