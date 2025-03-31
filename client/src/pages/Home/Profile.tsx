import { useDispatch, useSelector } from "react-redux";
import BodyProfile from "../../component/BodyProfile";
import NavProfile from "../../component/NavProfile";
import { RootState } from "../../store/store";
import { User, UserInfo } from "../../slices/userSlice";
import { navigateHome } from "../../slices/homeNavigateSlice";
import { useEffect } from "react";
type ProfileProps = {
    user:UserInfo
}

const Profile = ({user}:ProfileProps) => {
    console.log(3)
    const dispatch = useDispatch()
 
    return ( 
        <div className="profile">
            <NavProfile user={user} />
            <BodyProfile  />
        </div>
     );
}

export default Profile;