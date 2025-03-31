import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import TopLeftProfile from "./TopLeftProfile";
import { setUserBackground, User } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../selector/userSelector";
import { ChangeEvent, useState } from "react";
import { requestUser } from "../service/service";
import Spinner from "./Spinner";


type TopProfileProps = {

}

const TopProfile = () => {

    const user = useSelector(selectUserInfo)
    

    
    return (
        <div className="top-profile-container">
           
            <div className='top-profile-direct' >
                <TopLeftProfile user={user} />
            </div>
     
          
        </div>
    );
}

export default TopProfile;