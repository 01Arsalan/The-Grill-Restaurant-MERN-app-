import "@/assets/Styles/quality.css"
import { useSelector } from "react-redux"

const Quality = () => {

    const qualityImgData = useSelector((state) => state.homePage.data.quality)
    const qualityData = [
        { img: qualityImgData.img1.url, name: "Finest Ingredients", detail: "Made from the finest quality ingredients, to give you an authentic Kashmiri taste, every single time." },
        { img: qualityImgData.img2.url, name: "Fresh Ingredients", detail: "Our food is prepared on demand, so that everything served to you is always hot and fresh." },
        { img: qualityImgData.img3.url, name: "Safety and Quality", detail: "Our kitchens follow the highest safety and quality standards, which are fully compliant with fssai guidelines." }
    ]

    function Tile(props) {
        return (
            <div className="tile">
                <img className="img" src={props.img} width="50px" />
                <p className="tile--name">{props.name}</p>
                <p className="tile--detail">{props.detail}</p>
            </div>
        )
    }
    return (
        <div className="quality">
            <h2 className="title">Quality Assured</h2>
            <h2 className="lines"> <hr className="line"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr></h2>
            <div className="quality--items">
                {qualityData.map((item, index) => (
                    <Tile name={item.name} detail={item.detail} img={item.img} key={item.name} />
                ))}
            </div>
        </div>
    )
}

export default Quality;