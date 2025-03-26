import { useDispatch, useSelector } from "react-redux";
import BodyProfile from "../../component/BodyProfile";
import NavProfile from "../../component/NavProfile";
import { RootState } from "../../store/store";
import { User } from "../../slices/userSlice";
import { navigateHome } from "../../slices/homeNavigateSlice";
import { useEffect } from "react";


const Profile = () => {
    const dispatch = useDispatch()
    useEffect(()=>{

        dispatch(navigateHome(""))
    },[])
    return ( 
        <div className="profile">
            <NavProfile />
            <BodyProfile  />
        </div>
     );
}

export default Profile;