import { User } from "../slices/userSlice";
import MessengerDownCard from "./MessengerDownCard";
type MessengerDownProps={
    user:User
}
const MessengerDown:React.FC<MessengerDownProps> = ({user}) => {
    return (
        <div className="messenger-down-container">
            <MessengerDownCard keys={1}/>
            <MessengerDownCard keys={2}/>
            {/* <MessengerDownCard keys={3}/> */}


        </div>
    );
}

export default MessengerDown;