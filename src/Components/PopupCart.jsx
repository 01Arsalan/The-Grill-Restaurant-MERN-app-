import "@/assets/Styles/popupCart.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeItemQuan,changeOrderType } from "@/Features/cartSlice.js"

const PopupCart = () => {

    const dispatch = useDispatch()

    const cartItems = useSelector((state) => state.homePage.data.cart)
    const cartData = useSelector((state) => state.cart.cart)
    const orderType=useSelector((state)=>state.cart.orderType)


    const navigate = useNavigate();

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
                    <button className="btn sub" onClick={() => dispatch(changeItemQuan({ operation: "-", item: props.detail }))} >-</button>
                    <p className="num">{props.quan}</p>
                    <button className="btn sub" onClick={() => dispatch(changeItemQuan({ operation: "+", item: props.detail }))} >+</button>
                </div>
                <hr />
            </div>
        )
    }
    return (
        <div className="popupCart accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
                <h2 className="accordian-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span style={{ marginLeft: "auto", marginRight: "5px" }}> Cart </span><i class="bi bi-basket3"></i>
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div className="popupCart-type">
                            <div className="popupCart-type-title-btns">
                                <button className={orderType == "delivery" ? "orange-btn btn" : "btn"} onClick={() => dispatch(changeOrderType(0))}  ><img className="img" src={cartItems[0].url} width="20px" /><span>Delivery</span></button>
                                <button className={orderType == "pick-up" ? "orange-btn btn" : "btn"} onClick={() => dispatch(changeOrderType(1))}  ><img className="img" src={cartItems[1].url} width="18px" /><span>Pickup</span></button>
                                <button className={orderType == "dine-in" ? "orange-btn btn" : "btn"} onClick={() => dispatch(changeOrderType(2))}  ><img className="img" src={cartItems[2].url} width="20px" /><span>Dine-in</span></button>
                                <button className={orderType == "in-car" ? "orange-btn btn" : "btn"} onClick={() => dispatch(changeOrderType(3))}  ><img className="img" src={cartItems[3].url} width="25px" /><span>in Car</span></button>
                            </div>
                        </div>
                        <div className="popupCart-picked-items">
                            {cartData.map(item =>
                                <Tile detail={item.name} price={item.price} quan={item.quan} />
                            )}
                        </div>
                        <div className="popupCart-proceed">
                            <div className="popupCart-proceed-subtotal">
                                <p className="name">Subtotal</p>
                                <p className="total">{total()}</p>
                            </div>
                            <div className="popupCart-proceed-checkout" onClick={() => navigate('/menu/checkout')}>
                                <p className="name">Checkout</p>
                                <p className="total">{total()}</p>
                            </div>
                            <img className="img" width="300px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupCart;





