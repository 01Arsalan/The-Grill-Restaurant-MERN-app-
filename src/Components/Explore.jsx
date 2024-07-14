import "@/assets/Styles/explore.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Explore = () => {

    const exploreData = useSelector((state) => state.homePage.data.explore)

    const navigate = useNavigate()

    function Tile(props) {
        return (
            <div className="tile" onClick={() => navigate("/menu")}>
                <img className="img" src={props.img} />
                <p className="name">{props.name}</p>
            </div>
        )
    }
    return (
        <div className="explore">
            <h2 className="explore--title">explore</h2>
            <h2 className="lines"> <hr className="line"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr></h2>
            <div className="explore--items">
                {exploreData.map(item => (
                    <Tile name={item.name} img={item.img.url} key={item.name}/>
                ))}

            </div>
        </div>
    )
}

export default Explore;