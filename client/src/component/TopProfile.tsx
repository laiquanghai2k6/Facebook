import FacebookButton, { BUTTON_TYPE } from "./button/FacebookButton";
import TopLeftProfile from "./TopLeftProfile";
import Camera from '../assets/camera-black.png'
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
    const dispatch = useDispatch()
    const [loading,isLoading] = useState(false)

    const uploadBackground = async (e:ChangeEvent<HTMLInputElement>)=>{
        try{

            const data = new FormData()
            data.append('image',e.target.files?.[0] as File)
            data.append('userId',user._id)
            isLoading(true)
            const response = await requestUser.post('/uploadBackgroundImage',data)
            dispatch(setUserBackground(response.data))
            isLoading(false)
        }catch(e){
            alert('Tải ảnh không thành công')
        }
    }
    return (
        <div className="top-profile-container">
            {loading && <Spinner />}
            <div className='top-profile-direct' >
                <TopLeftProfile />
            </div>
     
            <div className='top-profile-camera' onClick={(e)=>{
                document.getElementById('upload-background')?.click()
            }}>
                <img src={Camera} style={{ width: '3vh', height: '3vh', color: 'black' }} />
                <p style={{ fontSize: '2vh', fontWeight: 'bold' }}>Chỉnh sửa ảnh bìa</p>
            </div>
            <input id="upload-background" type="file" onChange={(e)=>{uploadBackground(e)}} style={{display:'none'}} />
        </div>
    );
}

export default TopProfile;