import "@/assets/Styles/confirmation.css"
import confirmed from "@/assets/Images/confirmation.png"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { clearCart } from "../Features/cartSlice";
import axios from "axios";

const Confirmation = () => {
    const dispatch=useDispatch()
    const data = useSelector((state) => state.cart)
    const _id = useSelector((state) => state.user.user._id)
    const newData={...data,_id} // ceate an automatic name fiiller in slice
    
    const navigate = useNavigate();
    useEffect(() => {
        if(data.cart.length<1){
            navigate("/menu",{replace:true})
        }
        sendData(newData)
        dispatch(clearCart())
        const timer = setTimeout(() => {
            navigate('/',{replace:true});
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);


    return (
        <div className="confirmation">
            <div className="data">
                <img src={confirmed} className="img img-fluid" />
                <p> Redirecting.....</p>
            </div>
        </div>
    )
}

export default Confirmation;

const sendData = async (data) => {

    try {
        const response = await axios.post('/api/order', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error sending data:', error);
    }
}