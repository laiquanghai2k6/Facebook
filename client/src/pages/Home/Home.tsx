import { useSelector } from "react-redux";
import LeftHome from "../../component/LeftHome";
import MessengerDown from "../../component/MessengerDown";
import MidHome from "../../component/MidHome";
import Notification from "../../component/Notification";
import RightHome from "../../component/RightHome";
import { RootState } from "../../store/store";

const Home = () => {
     const currentUser = useSelector((state:RootState)=>state.user.getUser)

    return (
    <div className="home">
    
         <LeftHome user={currentUser} />
         <MidHome user={currentUser} />
         <RightHome user={currentUser} />
         <MessengerDown user={currentUser} />
         
    </div>
      );
}
 
export default Home;