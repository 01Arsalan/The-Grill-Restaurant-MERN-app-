import "@/assets/Styles/message.css"
import { useSelector } from "react-redux"

const Message = () => {
    const messageData = useSelector((state) => state.homePage.data.message)

    return (
        <div className="message">
            <img className="message-img img-fluid" src={messageData.img.url} />
        </div>
    )
}

export default Message;

