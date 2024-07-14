import "@/assets/Styles/franchise.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Franchise = () => {

    const franchiseData = useSelector((state) => state.homePage.data.franchise)

    const navigate = useNavigate()

    return (
        <div className="franchise">
            <div onClick={() => navigate("/contact")}>
                <img className="img img-fluid" src={franchiseData.img1.url} />
                <p className="title">The Grill</p>
                <p className="num">04+</p>
                <p className="outlets">Acoss The State</p>
                <img className="logo" src={franchiseData.img2.url} />
            </div>
        </div>
    )
}

export default Franchise;

