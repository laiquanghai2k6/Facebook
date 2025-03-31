import { useEffect } from "react";
import BodyProfileOther from "../../component/BodyProfileOther";
import NavProfile from "../../component/NavProfile";
import { useDispatch } from "react-redux";
import { navigateHome } from "../../slices/homeNavigateSlice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { User, UserInfo } from "../../slices/userSlice";

const ProfileOther = () => {
    const dispatch = useDispatch()
    const navigation = useNavigate()
    const location = useLocation();
    const currentUser = location.state as User;
    console.log(currentUser)
    if(!currentUser){
        navigation('/home')
        
        return <></> 
    }
    console.log('currentUserMain:',currentUser)


    useEffect(()=>{

        dispatch(navigateHome(""))
    },[])
    
    return ( 
        <div className="profile">
            <NavProfile user={currentUser} type="other" />
            
            <BodyProfileOther user={currentUser} />
        </div>
     );
}

export default ProfileOther;