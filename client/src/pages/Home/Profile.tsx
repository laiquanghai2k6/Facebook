import { useDispatch } from "react-redux";
import BodyProfile from "../../component/BodyProfile";
import NavProfile from "../../component/NavProfile";
import { User } from "../../slices/userSlice";
import { navigateHome } from "../../slices/homeNavigateSlice";
import { useEffect } from "react";
type ProfileProps = {
    user:User
}

const Profile = ({user}:ProfileProps) => {
    const dispatch = useDispatch()
    useEffect(()=>{

        dispatch(navigateHome(""))
    },[])
    return ( 
        <div className="profile">
            <NavProfile user={user} />
            <BodyProfile user={user}  />
        </div>
     );
}

export default Profile;