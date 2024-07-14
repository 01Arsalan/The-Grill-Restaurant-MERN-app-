import "@/assets/Styles/checkout.css"
import { useSelector, useDispatch } from "react-redux"
import { changeOrderType, setInfo } from "@/Features/cartSlice.js"
import { createOrder, confirmOrder } from "./utils"
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

const Checkout = () => {

    const cartImgs = useSelector((state) => state.homePage.data.checkout)
    const cartData = useSelector((state) => state.cart.cart)
    const orderType = useSelector((state) => state.cart.orderType)
    const cartItems = useSelector((state) => state.homePage.data.cart)
    const user = useSelector((state) => state.user.user)

    const amount = total()
    const discount = (amount * 15) / 100
    const taxes = (amount * 6) / 100
    const totalAmount = (amount - discount + taxes).toFixed(2)
    const receipt = "order_" + new Date().getTime();
    const razorpayUserInfo = {
        name: user.fullName,
        email: user.eamil,
        contact: user.phone
    }

    const dispatch = useDispatch()
    const [Razorpay] = useRazorpay();
    const navigate = useNavigate();

    useEffect(() => {
        if (cartData.length < 1) {
            navigate("/menu")
        }
    }, [])


    const handleClick = async () => {
        //put a check for user and display a message

        await dispatch(setInfo({ totalAmount, taxes, discount }))

        const response = await createOrder(totalAmount, receipt)

        confirmOrder(response, razorpayUserInfo, navigate)
    }

    function total() {
        let amount = 0
        cartData.map(item => {
            const cleanedPrice = item.price.replace(/[^\d.-]/g, '');
            amount += parseInt((parseInt(cleanedPrice)) * (parseInt(item.quan)))
        })
        return amount
    }


    function OfferTile(props) {
        return (
            <div className="tile">
                <img className="img" width="30px" src={cartImgs.img1.url} />
                <div className="offer">
                    <p className="code">{props.code}</p>
                    <p className="detail">{props.detail}</p>
                </div>
            </div>
        )
    }

    function Tile(props) {
        return (
            <div className="tile">
                <p className="name">{props.name}</p>
                <div className="quan-price">
                    <p className="quantity">{props.quan}</p>
                    <p className="price">{props.price}</p>
                </div>
                <img className="img" width="20px" src={cartImgs.img2.url} />
            </div>
        )
    }
    return (
        <div className="checkout-section">
            <div className="section-1">
                <div className="location">
                    <img width="20px" />
                    <p>The Grill, National Highway 1A, Bijbehara, Jammu and Kashmir PIN: 192124</p>
                </div>
                <div className="order-type">
                    <button className={orderType == "delivery" ? "orange-btn btn" : "btn"} onClick={() => dispatch(changeOrderType(0))}  ><img className="img" src={cartItems[0].url} width="20px" /><span>Delivery</span></button>
                    <button className={orderType == "pick-up" ? "orange-btn btn" : "btn"} onClick={() => dispatch(changeOrderType(1))}  ><img className="img" src={cartItems[1].url} width="18px" /><span>Pickup</span></button>
                    <button className={orderType == "dine-in" ? "orange-btn btn" : "btn"} onClick={() => dispatch(changeOrderType(2))}  ><img className="img" src={cartItems[2].url} width="20px" /><span>Dine-in</span></button>
                    <button className={orderType == "in-car" ? "orange-btn btn" : "btn"} onClick={() => dispatch(changeOrderType(3))}  ><img className="img" src={cartItems[3].url} width="25px" /><span>in Car</span></button>
                </div>
                <div className="additional-detail">
                    {orderType == "delivery" ?
                        <>
                            <p className="to">Delivery at </p>
                            <p className="address">{user.address}</p>
                        </> :
                        orderType == "pick-up" ?
                            <>
                                <p className="to">You will need to pickup this order from:</p>
                                <p className="address">new coloney, bijbehara, islamabad, jammu & kashmir</p>
                            </> :
                            orderType == "dine-in" ?
                                <>
                                    <p className="to">Table 4 will be reserved for you.</p>
                                    <p className="address">Addtitonal fee will be cahrged, for reservation time.</p>
                                </> :
                                orderType == "in-car" ?
                                    <>
                                        <p className="to">In Car No:</p>
                                        <input type="text" className="carno" placeholder="e.g: TN 37 CF 1002" />
                                    </> :
                                    <></>}
                </div>
                <div className="added_items">
                    <h2 className="title">ITEMS ADDED</h2>
                    <div className="items">
                        {cartData.map((item, index) => {
                            return (<Tile name={item.name} quan={item.quan} price={item.price} key={index} />)
                        })}
                    </div>
                </div>
                <div className="instructions">
                    <img className="img" width="20px" src={cartImgs.img3.url} />
                    <input className="input" type="text" placeholder="cooking instructions..."></input>
                </div>
            </div>

            <div className="section-2">
                <h2 className="title">OFFERS</h2>
                <div className="offers">
                    <OfferTile code="B2G1" detail="Buy Any 2 and Get 1 Free" key={1} />
                    <OfferTile code="F1FD" detail="Free Delivery For 2 Order" key={2} />
                    <OfferTile code="3BO5" detail="30% Off on Orders Above 500" key={3} />
                </div>
                <div className="bill-details">
                    <h2 className="title">BILL DETAILS</h2>
                    <div className="details">
                        <div className="detail">
                            <p className="type">SUBTOTAL</p>
                            <p className="price subtotal">{amount}</p>
                        </div>
                        <div className="detail">
                            <p className="type">DISCOUNT</p>
                            <p className="price discount">{discount}</p>
                        </div>
                        {orderType == 0 ?
                            <div className="detail">
                                <p className="type delivery">DELIVERY</p>
                                <p className="price delivery">60</p>
                            </div> : <></>
                        }
                        <div className="detail">
                            <p className="type">TAXES</p>
                            <p className="price get">{taxes}</p>
                        </div>
                        <div className="detail">
                            <p className="type grand">GRAND-TOTAL</p>
                            <p className="price grand">{totalAmount}</p>
                        </div>

                        <button className="payment" onClick={handleClick} id="rzp-button1">Pay Securely</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;




