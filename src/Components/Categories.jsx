import "@/assets/Styles/categories.css"
import { useSelector } from "react-redux"

const Categories = ({ handleScroll }, props) => {

    const categoryData = useSelector((state) => state.homePage.data.category)

    function Tile(props) {
        return (
            <div className="item" onClick={() => handleScroll(props.id)}>
                <img className="img" src={props.img} />
                <p className="title">{props.title}</p>
                <p className="itemNum">({props.itemNum})</p>
            </div>
        )
    }
    return (
        <div className="sec categories" id={props.id}>
            <h2 className="categories-title">Categories</h2>
            <div className="category-items">
                {categoryData.map((item,index)=>{
                    return (<Tile title={item.title} itemNum={item.itemNum} id={item.id} img={item.img.url} key={index} />)
                })}
            </div>
        </div>
    )
}

export default Categories;

