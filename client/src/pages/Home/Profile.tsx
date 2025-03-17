import { useSelector } from "react-redux";
import BodyProfile from "../../component/BodyProfile";
import NavProfile from "../../component/NavProfile";
import { RootState } from "../../store/store";
import { User } from "../../slices/userSlice";


const Profile = () => {
  
    return ( 
        <div className="profile">
            <NavProfile />
            <BodyProfile  />
        </div>
     );
}

export default Profile;