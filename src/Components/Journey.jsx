import "@/assets/Styles/journey.css";
import { useSelector } from "react-redux";

const Tile = ({ date, dis }) => (
  <div className="date_dis">
    <p className="date">{date}</p>
    <p className="discription">{dis}</p>
  </div>
)

const Journey = () => {
  const journeyData = useSelector((state) => state.homePage.data.journey)

  return (
    <div className="growth">
      <div className="growth-info col">
        <h2 className="growth-title">
          <span className="brand">The Grill </span>Growth Journey
        </h2>
        <Tile date="2011" dis="Launched the 1st Outlet." />
        <Tile date="2012" dis="Launched 2 More Outlets In Neighbouring Town." />
        <Tile date="2016" dis="Launched several outlets across valley." />
        <Tile date="2021" dis="Launched outlets across borders" />
        <Tile date="20.." dis="................................" />
      </div>
      <img className="growth-img col-4" src={journeyData.img.url} alt="Growth Journey" />
    </div>
  )
}
export default Journey;

