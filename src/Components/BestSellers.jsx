import "@/assets/Styles/bestSellers.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const BestSellers = () => {

    const bestSellersData = useSelector((state) => state.homePage.data.bestSellers)

    const navigate = useNavigate()

    function Tile(props) {
        return (
            <div className="tile" onClick={() => navigate("/menu")}>
                <img className="img img-fluid" src={props.img} />
                <p className="recommended">&#9733;<span> recommended</span></p>
                <p className="name">{props.name}</p>
                <p className="detail">{props.detail}</p>
            </div>
        )
    }
    return (
        <div className="bestSellers">
            <h2 className="bestSellers--title">Best Sellers</h2>
            <h2 className="lines"> <hr className="line"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr></h2>
            <div className="bestSellers--items">
                {bestSellersData.map(item => (
                    <Tile name={item.name} detail={item.detail} img={item.img.url} key={item.name} />
                ))}
            </div>
        </div>
    )
}

export default BestSellers;




