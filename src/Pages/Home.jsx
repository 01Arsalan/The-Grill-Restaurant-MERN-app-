import HomeImg from "../Components/HomeImg";
import Deals from "../Components/Deals";
import About from "../Components/About"
import Message from "../Components/Message";
import Journey from "../Components/Journey";
import Across from "../Components/Across";
import Quality from "../Components/Quality";
import Explore from "../Components/Explore";
import BestSellers from "../Components/BestSellers";
import Franchise from "../Components/Franchise";
import Reviews from "../Components/Reviews";
import Footer from "../Components/Footer";
import Owned from "../Components/Owned"
import { useEffect } from "react";


const Home = () => {

   useEffect(() => {
      document.querySelector(".navbar").classList.add("scrolled-navbar")

      return () => {
         document.querySelector(".navbar").classList.remove("scrolled-navbar")
      }
   },[])

   return (
      <>
         <HomeImg />
         <Deals />
         <About />
         <Message />
         <Journey />
         <Across />
         <Quality />
         <Explore />
         <BestSellers />
         <Franchise />
         <Reviews />
         <Footer />
         <Owned />
      </>
   )
}

export default Home;


window.addEventListener("scroll", () => {
   if (window.location.pathname == "/" && window.scrollY > 86) {
      document.querySelector(".navbar").classList.remove("scrolled-navbar")
   }
   else if (window.location.pathname == "/" && window.scrollY < 86) {
      document.querySelector(".navbar").classList.add("scrolled-navbar")
   }
})