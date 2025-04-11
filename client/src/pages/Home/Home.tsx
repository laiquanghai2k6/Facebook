import {  useSelector } from "react-redux";
import LeftHome from "../../component/LeftHome";
import MidHome from "../../component/MidHome";

import RightHome from "../../component/RightHome";


import { selectUserInfo } from "../../selector/userSelector";

export type Chat={
     _id:string,
     user:string[],
     lastMessage:string,
     senderId:string,
     seen1:boolean,
     seen2:boolean,
     updatedAt:string
}

const Home = () => {
     // const dispatch= useDispatch()
     const user = useSelector(selectUserInfo)
     

     
    return (
    <div className="home">
    
         <LeftHome  />
         <MidHome  />
         <RightHome currentUser={user} />
         
    </div>
      );
}
 
export default Home;