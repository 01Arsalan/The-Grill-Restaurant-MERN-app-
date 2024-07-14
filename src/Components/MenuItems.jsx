import "@/assets/Styles/menuItems.css"
import { useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addItem } from "@/Features/cartSlice.js"


const MenuItems = ({ setIsSearchModal }) => {

    const menuData = useSelector((state) => state.homePage.data.menuItem)
    const dispatch = useDispatch()

    const [foodType, setfoodType] = useState({ veg: true, non_veg: true })

    function changeFoodType(type) {
        if (type == "veg") setfoodType({ veg: true, non_veg: (!foodType.non_veg) })
        if (type == "non_veg") setfoodType({ veg: (!foodType.veg), non_veg: true })
    }

    function ItemSet(props) {
        const Id = "set_" + props.id
        function Tile(props) {
            const divRef = useRef(null);

            if (props.type == "non_veg" && foodType.non_veg == false) return (<></>)
            if (props.type == "veg" && foodType.veg == false) return (<></>)

            return (
                <div className="item" ref={divRef} onClick={() => dispatch(addItem({ item: divRef.current }))} id={props.id}>
                    <div className="detail">
                        <p className="name">{props.name}</p>
                        <p className="price">&#8377;{props.price}</p>
                    </div>
                    <img className="img img-fluid" src={props.img} width="190px" />
                </div>
            )
        }
        return (

            <div className="itemSet" id={Id}>
                <hr className="bar"></hr>
                <h2 className="title">{props.title}</h2>
                <h2 className="lines"> <hr className="line"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr></h2>
                <div className="items">
                    {menuData.foodData[props.title].map((item, index) => {
                        return (<Tile name={item.name} price={item.price} type={item.type} id={item.id} img={item.img.url} key={index} />)
                    })}
                </div>
            </div>
        )
    }

    function OfferTile(props) {
        return (
            <div className="tile">
                <img className="img" src={menuData.discountLogo.url} />
                <p className="detail">Buy 2 and Get 1 <span className="span-1">Free...</span><br /><span className="light span-2">Use Code </span> <span className="span-3">{props.code}</span></p>
            </div>
        )
    }

    return (
        <div className="sec menuItems">
            <div className="offers">
                <OfferTile code="B2G1" />
                <OfferTile code="B2G1" />
                <OfferTile code="B2G1" />
            </div>
            <div className="search-select" id="search-select">
                <button className="search--btn" onClick={() => { setIsSearchModal(true) }}><span>&#x1F50D;</span>Search...</button>
                <div className="select">
                    <button className={foodType.non_veg == true ? "select-btn veg select-clicked-btn" : "select-btn veg"} onClick={() => changeFoodType("veg")}><span className="green" >&#9679;</span> Veg</button>
                    <button className={foodType.veg == true ? "select-btn non_veg  select-clicked-btn" : "select-btn non-veg"} onClick={() => changeFoodType("non_veg")}><span className="red" >&#9650;</span> Non-Veg</button>
                </div>
            </div>
            <div className="menuCategory-items">
                {Object.keys(menuData.foodData).map((key, index) => (
                    <ItemSet title={key} id={index + 1} key={index} />
                ))}
            </div>
        </div>
    )
}

export default MenuItems;
