import "@/assets/Styles/contact.css"
import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from 'react';

export default function Contact() {

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


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
// add a check to see if used is logged in.
        setFormData({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            message: ''
        })

        navigate("/");
    };

    return (
        <div className="contact">
            <p className="detail">WE WOULD LOVE TO HEAR FROM YOU<br /><span className="small">Drop us a line to say hello</span></p>
            <p className="title">Contact Us</p>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    className='input'
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <input
                    className='input'
                    type="text"
                    placeholder="Last Name"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                <input
                    className='input'
                    type="number"
                    placeholder="Contact Number"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                <input
                    className='input'
                    type="email"
                    placeholder="Email-id"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <textarea
                    className='message'
                    type="text"
                    placeholder="Write your message..."
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                />

                <button className='submit' type="submit">Submit</button>
            </form>
        </div>
    );
}
