import { useSelector } from "react-redux";
import LeftHome from "../../component/LeftHome";
import MessengerDown from "../../component/MessengerDown";
import MidHome from "../../component/MidHome";
import Notification from "../../component/Notification";
import RightHome from "../../component/RightHome";
import { RootState } from "../../store/store";
import { useEffect } from "react";

const Home = () => {


    return (
    <div className="home">
    
         <LeftHome  />
         <MidHome  />
         <RightHome  />
         {/* <MessengerDown /> */}
         
    </div>
      );
}
 
export default Home;