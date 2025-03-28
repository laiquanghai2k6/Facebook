import { useDispatch, useSelector } from "react-redux";
import BodyProfile from "../../component/BodyProfile";
import NavProfile from "../../component/NavProfile";
import { RootState } from "../../store/store";
import { User } from "../../slices/userSlice";
import { navigateHome } from "../../slices/homeNavigateSlice";
import { useEffect } from "react";


const Profile = () => {
    console.log(3)
    const dispatch = useDispatch()
 
    return ( 
        <div className="profile">
            <NavProfile />
            <BodyProfile  />
        </div>
     );
}

export default Profile;