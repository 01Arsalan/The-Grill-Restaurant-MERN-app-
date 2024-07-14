import "@/assets/Styles/cart.css"
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"
import {changeItemQuan,changeOrderType} from "@/Features/cartSlice.js"
import { toast } from "react-hot-toast";


const Cart = () => {

    const dispatch=useDispatch()

    const cartItems=useSelector((state)=>state.homePage.data.cart)
    const cartData=useSelector((state)=>state.cart.cart)
    const orderType=useSelector((state)=>state.cart.orderType)
    const user = useSelector(state => state.user);


    const navigate = useNavigate();


    const handleCheckout = () => {
        if (cartData.length === 0) {
            toast.error("Your cart is empty. Please add items to the cart before checking out.");
            return;
        }
        if (!user.isUser) {
            toast.error("You must be logged in to proceed to checkout.");
            return;
        }
        navigate('/menu/checkout');
    };

    function total() {
        let amount = 0
        cartData.map(item => {
            const cleanedPrice = item.price.replace(/[^\d.-]/g, '');
            amount += parseInt((parseInt(cleanedPrice)) * (parseInt(item.quan)))
        })
        return amount
    }

    function Tile(props) {
        return (
            <div className="tile">
                <p className="detail">{props.detail}</p>
                <p className="quan-price">{props.price}</p>
                <div className="add-sub">
                    <button className="btn sub" onClick={() => dispatch(changeItemQuan({operation : "-",item: props.detail}))} >-</button>
                    <p className="num">{props.quan}</p>
                    <button className="btn sub" onClick={() => dispatch(changeItemQuan({operation : "+",item: props.detail}))} >+</button>
                </div>
                <hr />
            </div>
        )
    }
    return (
        <div className="sec cart">
            <div className="type">
                <h2 className="title">your cart</h2>
                <div className="btns">
                    <button className={orderType == "delivery" ? "orange-btn btn" :  "btn"} onClick={()=>dispatch(changeOrderType(0))}  ><img className="img" src={cartItems[0].url} width="20px" /><span>Delivery</span></button>
                    <button className={orderType == "pick-up" ? "orange-btn btn" :  "btn"} onClick={()=>dispatch(changeOrderType(1))}  ><img className="img" src={cartItems[1].url} width="18px" /><span>Pickup</span></button>
                    <button className={orderType == "dine-in" ? "orange-btn btn" :  "btn"} onClick={()=>dispatch(changeOrderType(2))}  ><img className="img" src={cartItems[2].url} width="20px" /><span>Dine-in</span></button>
                    <button className={orderType == "in-car" ? "orange-btn btn" :  "btn"} onClick={()=>dispatch(changeOrderType(3))}  ><img className="img" src={cartItems[3].url} width="25px" /><span>in Car</span></button>
                </div>
            </div>
            <div className="picked-items">
                {cartData.map((item,index) =>{
                    return (<Tile detail={item.name} price={item.price} quan={item.quan} key={index} />)
                })}
            </div>
            <div className="proceed">
                <div className="subtotal">
                    <p className="name">Subtotal</p>
                    <p className="total">{total()}</p>
                </div>
                <div className="checkout" onClick={handleCheckout}>
                    <p className="name">Checkout</p>
                    <p className="total">{total()}</p>
                </div>
                <img className="img"  width="300px" />
            </div>
        </div>
    )
}

export default Cart;
