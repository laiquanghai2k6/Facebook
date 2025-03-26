import { useEffect } from "react";
import BodyProfileOther from "../../component/BodyProfileOther";
import NavProfile from "../../component/NavProfile";
import { useDispatch } from "react-redux";
import { navigateHome } from "../../slices/homeNavigateSlice";

const ProfileOther = () => {
    const dispatch = useDispatch()
    useEffect(()=>{

        dispatch(navigateHome(""))
    },[])
    return ( 
        <div className="profile">
            <NavProfile />
            
            <BodyProfileOther />
        </div>
     );
}

export default ProfileOther;