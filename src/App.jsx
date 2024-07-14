import React from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Menu from "./Pages/Menu"
import Login from "./Pages/Login/Login.jsx"
import LoginModal from "./Components/LoginModal/LoginModal.jsx"
import Orders from "./Pages/Orders.jsx"
import Owned from "./Components/Owned.jsx"
import Contact from "./Pages/Contact.jsx"
import Info from "./Pages/Info.jsx"
import axios from "axios"
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchHomePageData } from "./Features/homePageSlice";
import { addUser } from "./Features/userSlice.js";


const App = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.homePage)
    
    useEffect(() => {
        dispatch(fetchHomePageData())
        //getting data from session if it exists
        const fetchData = async () => {
            try {
                // Fetch home page data
                 dispatch(fetchHomePageData());
                 
                // Fetch user session data
                const response = await axios.post('/api/user/isUser');
                if (response.data.exists) {
                    dispatch(addUser(response.data.user.user));
                }
            } catch (error) {
                console.error('Error fetching session data:', error);
            }
        };
    
        fetchData();
        
    }, [dispatch])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return null;

    const isUser=data.nav.userData.loggedIn //make a selector for it


    return (
        <div>
            <Navbar />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/menu/*" element={<Menu />} />
                <Route path="/login/" element={<Login />} />
                <Route path="/info/" element={<Info />} />
                <Route path="/orders/" element={<><Orders /> <Owned /> </>} />
                <Route path="/contact/" element={<Contact />} />
            </Routes>
            {isUser && <LoginModal />}
        </div>
    )
}

export default App;