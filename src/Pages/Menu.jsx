import "@/assets/Styles/menu.css"
import { Routes, Route } from "react-router-dom";
import Categories from "../Components/Categories";
import MenuItems from "../Components/MenuItems";
import Cart from "../Components/Cart";
import PopupCart from "../Components/PopupCart";
import SearchModal from "../Components/searchModal";
import Checkout from "./Checkout/Checkout";
import Confirmation from "../Components/Confirmation";
import {useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";


function handleScroll(id) {

    const container = document.querySelector(".menuCategory-items")
    const target = container.querySelector(`#${id}`);

    if (target) {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
        });

        setTimeout(()=>{
            container.scrollBy({
                top: -80,
                behavior: "smooth"
            });

        },800)
    }
    
}


const Menu = () => {

    const [popup, setPopup] = useState(window.innerWidth<951)
    const [isSearchModal, setIsSearchModal] = useState(false)
    
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setPopup(window.innerWidth<951)
        })
    },[window.innerWidth<951])

    useEffect(() => {
        const applyCSSChanges = () => {
            const nav = document.querySelector('.navbar');
            if (nav) {
                nav.classList.remove("scrolled-navbar")
            }
        };
        applyCSSChanges();
        return () => {
            const nav = document.querySelector('.navbar');
            if (nav) {
                nav.classList.add("scrolled-navbar")
            }
        };
    }, []);


    return (
        <div className="menu">
            <Toaster />
            <Routes>
                <Route path="/" element={<>
                    <Categories handleScroll={handleScroll}/>
                    <MenuItems setIsSearchModal={setIsSearchModal}/>
                    <Cart />
                    {popup&&<PopupCart />}
                    {isSearchModal && <SearchModal setIsSearchModal={setIsSearchModal} handleScroll={handleScroll} />}
                </>} />
                <Route path="/checkout" element={<Checkout user={true} checkoutoption={1} />}/>
                <Route path="/confirmation" element={<Confirmation />}/>
            </Routes>
        </div>
    )
}

export default Menu;

