import ImageChain from "./ImageChain";
import UserImage from "./UserImage";
import DefaultImage from '../assets/default-image.png'
import Camera from '../assets/camera-black.png'
import { ChangeEvent, useState } from "react";
import { selectUserInfo } from "../selector/userSelector";
import { useDispatch, useSelector } from "react-redux";
import { requestUser } from "../service/service";
import { setUserImage } from "../slices/userSlice";
import Spinner from "./Spinner";
const TopLeftProfile = ()=>{
    const [isLoading,setIsLoading] = useState(false)
    const user = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    const openSetImage = ()=>{
        document.getElementById('input-file-profile')?.click()
    }
    const uploadImage = async (e:ChangeEvent<HTMLInputElement>)=>{
        
        try{

            const formData = new FormData()
            formData.append('userId',user._id)
            formData.append('image',e?.target?.files?.[0] as File)
            setIsLoading(true)
            const response = await requestUser.post('/uploadUserImage',formData)
            dispatch(setUserImage(response.data))
            setIsLoading(false)

        }catch(e:any){
            alert(e.response.data)
        }
    
    }

    return (
        <div className='top-left-profile'>
            {isLoading && <Spinner />}
            <div className='icon-round-background' style={{ width: '20vh', height: '20vh', }}>

                <img src={user.image == "" ? DefaultImage : user.image} style={{
                    width: '115%',
                    height: '115%',
                    objectFit: 'cover',
                    display: 'block',
                    position: 'absolute',
                    borderRadius: '50%',

                }} />
                <div onClick={openSetImage} style={{position:'absolute',right:'15%',bottom:'10%',backgroundColor:'white',height:'3.5vh',width:'3.5vh',borderRadius:'1vh'}}>
                    <img src={Camera} style={{ width: '3.2vh', height: '3.2vh', }} />
                </div>
                
                <input onChange={(e)=>uploadImage(e)} type="file" id="input-file-profile" style={{ display: 'none' }} />

            </div>
            {/* <UserImage height={'20vh'} width={'20vh'} /> */}
            <div className='top-profile-right-image'>
                <p style={{ fontSize: '3.5vh', color: 'white', fontWeight: 'bold' }}>Lai Quang Hai</p>
                <p style={{ fontSize: '2vh', color: '#a2aeb8' }}>636 Người bạn</p>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1vh' }}>
                    <ImageChain img={DefaultImage} />
                    <ImageChain img={DefaultImage} />
                    <ImageChain img={DefaultImage} />
                    <ImageChain img={DefaultImage} />
                    <ImageChain img={DefaultImage} />
                </div>
            </div>
        </div>
    );
}

export default TopLeftProfile;