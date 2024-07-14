import "@/assets/Styles/homeimg.css"
import { useSelector } from "react-redux"

const HomeImg = () => {

   const homeData=useSelector((state)=>state.homePage.data.home)
   
   return(
    <div className="homeimg">
        <img className="homeimg-img"src={homeData.img.url}/>
      </div>
   )
}

export default HomeImg;