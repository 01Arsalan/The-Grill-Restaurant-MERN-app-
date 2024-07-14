import React from "react";
import { useNavigate } from "react-router-dom";
import "@/assets/Styles/deals.css"
import { useSelector } from "react-redux";


const Deals = () => {
    const navigate = useNavigate()
    const dealsData = useSelector((state) => state.homePage.data.deals)

    const [isActive, setIsActive] = React.useState(0)

    function handleScroll(buttonIndex) {
        const container = document.querySelector(".deals .tiles");
        const tiles = document.querySelectorAll(".deals .tiles .deal");
        const containerWidth = container.clientWidth;
        const tileWidth = tiles[0].clientWidth;
      
        let scrollPosition;
      
        switch (buttonIndex) {
          case 0:
            scrollPosition = 0;
            break;
          case 1:
            scrollPosition = tileWidth * 1.8; 
            break;
          case 2:
            scrollPosition = tileWidth * 3; 
            break;
          case 3:
            scrollPosition = container.scrollWidth - containerWidth;
            break;
          default:
            scrollPosition = 0;
        }
      
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });

        setIsActive(buttonIndex)
      }
      

    function Tile(props) {
        return (
            <div className="deal container" onClick={() => navigate("/menu")}>
                <section className="deal-detail col-7">
                    <p className="flat">flat</p>
                    <p className="price">&#8377;{props.price}</p>
                    <div className="offAbove">
                        <p className="off">off</p>
                        <p className="above">on order <br />above <br />&#8377;{props.above}</p>
                    </div>
                    <p className="code"><span className="dim">use code </span>{props.code}</p>
                </section>
                <div className="deal-img col-5">
                    <img className="img" src={props.img} />
                </div>

            </div>
        )
    }
    return (
        <div className="deals ">
            <h2 className="deals-title">deals and offers</h2>
            <h2 className="lines"> <hr className="line"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr></h2>
            <div className="tiles">
                {dealsData.map(item => (
                    <Tile
                        price={item.price}
                        above={item.above}
                        code={item.code}
                        img={item.img.url}
                        key={item.price}
                    />
                ))}
            </div>
            <div className="deals-btns">
                <button className={isActive == 0 ? "activeBtn bttn" : "bttn"} onClick={() => handleScroll(0)}></button>
                <button className={isActive == 1 ? "activeBtn bttn" : "bttn"} onClick={() => handleScroll(1)}></button>
                <button className={isActive == 2 ? "activeBtn bttn" : "bttn"} onClick={() => handleScroll(2)}></button>
                <button className={isActive == 3 ? "activeBtn bttn" : "bttn"} onClick={() => handleScroll(3)}></button>
            </div>
        </div>
    )
}

export default Deals;




