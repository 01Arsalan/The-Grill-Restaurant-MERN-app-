import express from "express"
import { order, fetchOrders, createOrder } from "../Controllers/order.js"

const router = express.Router()

router.route("/")
    .post(order)

router.route("/createOrder")
    .post(createOrder)

router.route("/fetchOrders")
    .get(fetchOrders)


export default router


