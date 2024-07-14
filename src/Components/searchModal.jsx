import "@/assets/Styles/searchModal.css";
import closeBtn from "@/assets/Images/closebtn_logo.png";
import React from "react";
import { useSelector } from "react-redux";

export default function SearchModal({ setIsSearchModal, handleScroll }) {
    const foodData = useSelector((state) => state.homePage.data.menuItem.foodData);

    const [searchData, setSearchData] = React.useState([]);
    const [searchFor, setSearchFor] = React.useState("");

    function handleSearch(e) {
        const search = e.target.value.toLowerCase();
        setSearchFor(search);

        if (search === "") {
            setSearchData([]);
            return;
        }

        const results = Object.keys(foodData)
            .flatMap(key => foodData[key])
            .filter(item => item.name.toLowerCase().startsWith(search))
            .map(item => ({
                name: item.name,
                img: item.img.url,
                id: item.id
            }));

        setSearchData(results);
    }

    function find(id) {
        setIsSearchModal(false);
        handleScroll(id);
    }

    function Tile(props) {
        return (
            <div className="tile" onClick={() => find(props.id)}>
                <img className="img" src={props.img} alt={props.name} />
                <p className="name">{props.name}</p>
            </div>
        );
    }

    return (
        <div className="search-modal-overlay">
            <div className="search-modal">
                <div className="header">
                    <p className="title">Search</p>
                    <button className="close-btn" onClick={() => setIsSearchModal(false)}>
                        <img src={closeBtn} className="img" alt="Close" />
                    </button>
                </div>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="e.g: Grilled Steak"
                    onChange={handleSearch}
                    value={searchFor}
                />
                <div className="search-items">
                    {searchData.map(item => (
                        <Tile key={item.id} name={item.name} img={item.img} id={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
