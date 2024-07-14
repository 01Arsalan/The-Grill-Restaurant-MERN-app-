import "@/assets/Styles/reviews.css"
import { useEffect } from "react";
import { useSelector } from "react-redux";

let data
const Reviews = () => {

    const reviewsData = useSelector((state) => state.homePage.data.reviews)
    data = reviewsData

    useEffect(() => {
        changeReview();
    }, [1])

    function Tile() {
        return (
            <div className="tile">
                <p className="review"></p>
                <p className="name"></p>
            </div>
        )
    }
    return (
        <div className="cusRev">
            <p className="cusRev--detail1">Happy Customers Around the Stores</p>
            <p className="cusRev--detail2">More than 1,00,000 Users Served Till Date</p>
            <h2 className="lines"> <hr className="line"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr><hr className="smallLine"></hr></h2>
            <div className="reviewsList">
                <Tile />
            </div>
        </div>
    )
}

export default Reviews;



let currentIndex = 0;
function changeReview() {
    const reviewElement = document.querySelector('.reviewsList .tile .review');
    const nameElement = document.querySelector('.reviewsList .tile .name');

    reviewElement.textContent = data[currentIndex].review;
    nameElement.textContent = `- ${data[currentIndex].name}`;

    currentIndex = (currentIndex + 1) % data.length;
}

setInterval(() => {
    if (window.location.pathname === "/") changeReview()
}, 4000)
