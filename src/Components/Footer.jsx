import "@/assets/Styles/footer.css"
import { Link } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Footer = () => {
    //dropdown menu for footer items
    // const [isDropdown, setIsDropdown] = useState(window.innerWidth < 400)

    // const handleResize = useCallback(() => {
    //     setIsDropdown(window.innerWidth < 400)
    // }, [])

    // useEffect(() => {
    //     window.addEventListener("resize", handleResize)
    //     return () => window.removeEventListener("resize", handleResize)
    // }, [handleResize])

    const footerData = useSelector((state) => state.homePage.data.footer)


    return (
        <footer className="footer">
            <div className="section links">
                <h2 className="title" >
                    Useful Links</h2>
                <h2 className="lines">
                    <hr className="line" />
                </h2>
                <Link to="/footerComponent/refund" className="link">Refund Policy</Link>
                <Link to="/footerComponent/t-and-c" className="link">Terms & Conditions</Link>
                <Link to="/footerComponent/privacy" className="link">Privacy Policy</Link>
            </div>
            <div className="section payment">
                <h2 className="title">Payment Methods</h2>
                <h2 className="lines"> <hr className="line"></hr></h2>
                <div className="img-list">
                    <img className="img" src={footerData.paymentImg.url}></img>
                </div>
            </div>
            <div className="section contact">
                <h2 className="title">
                    Contact Us
                </h2>
                <h2 className="lines">
                    <hr className="line" />
                </h2>
                <Link to="/contact" className=" link">Customer Support</Link>
                <a href="mailto:support@theGrill.in" className=" link">support@theGrill.in</a>
                <Link to="/contact" className=" link">Franchise Enquiry</Link>
                <a href="mailto:info@theGrill.in" className=" link">info@theGrill.in</a>

            </div>
            <div className="section follow">
                <h2 className="title">Follow Us</h2>
                <h2 className="lines"> <hr className="line"></hr></h2>
                <div className="logo-list">
                    <img className="logo" src={footerData.followImg.img1.url}></img>
                </div>
            </div>
        </footer >
    )
}

export default Footer;

