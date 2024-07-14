import "@/assets/Styles/about.css";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const About = () => {

    const aboutData = useSelector((state) => state.homePage.data.about)

    const [isExpanded, setIsExpanded] = useState(window.innerWidth > 1300);

    const toggleReadMore = () => setIsExpanded((prev) => !prev);

    const handleResize = useCallback(() => {
        setIsExpanded(window.innerWidth > 1300);
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    const fullText = `The inception of "The Grill" was a dream nurtured by Arsalan Wani, an aspiring culinary aficionado from the beautiful valley of Kashmir. In 2011, The restaurant, became a mosaic of worldwide tastes, curated for diverse palates. Arsalan's vision to harmonize cultural cuisines unfolded, offering a culinary voyage spanning continents. The Grill's first outlet quickly became a local favorite, celebrating flavors from all corners of the globe. The Grill's success echoed its fusion of world cuisines. Recently, expanding to London, The Grill symbolizes culinary diversity, transcending borders. Arsalan's passion culminated in a haven where flavors intertwine, captivating patrons' palates globally. The Grill remains a testament to Arsalan's dream—a celebration of flavors that transcend cultural boundaries.`;

    const truncatedText = `The inception of "The Grill" was a dream nurtured by Arsalan Wani, an aspiring culinary aficionado from the beautiful valley of Kashmir. In 2011, The restaurant, became a mosaic of worldwide tastes, curated for diverse palates...`;

    return (
        <div>
            <div className="about">
                <div className="about-detail">
                    <h2 className="title">About Us</h2>
                    <p className="description">The story of The Grill</p>
                    <h2 className="lines">
                        <hr className="line" />
                        <hr className="smallLine" />
                        <hr className="smallLine" />
                        <hr className="smallLine" />
                    </h2>
                    <p className="detail">
                        {isExpanded ? fullText : truncatedText}
                        <span
                            onClick={toggleReadMore}
                            style={{ color: "blue", cursor: "pointer" }}
                        >
                            {isExpanded ? " Show Less" : " Read More"}
                        </span>
                    </p>
                </div>
                <div className="img-container col">
                    <img className="about-img img-fluid" src={aboutData.img.url} alt="About us" />
                </div>
            </div>
            <img className="about-img-below" src={aboutData.img.url} alt="About us below" />
        </div>
    );
};

export default About;
