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
type TopLeftProfileProps={
    type?:string
}

const TopLeftProfile = ({type="own"}:TopLeftProfileProps)=>{
    const [loading,isLoading] = useState(false)

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
            isLoading(true)
            const response = await requestUser.post('/uploadUserImage',formData)
            dispatch(setUserImage(response.data))
            isLoading(false)

        }catch(e:any){
            alert(e.response.data)
        }
    
    }

    return (
        <div className='top-left-profile'>
            {loading && <Spinner />}
            <div className='icon-round-background' style={{ width: '10rem', height: '10rem' }}>

                <img src={user.image == "" ? DefaultImage : user.image} style={{
                    width: '115%',
                    height: '115%',
                    objectFit: 'cover',
                    display: 'block',
                    position: 'absolute',
                    borderRadius: '50%',

                }} />
                {type == "own" &&(

                <div onClick={openSetImage} style={{position:'absolute',right:'15%',bottom:'10%',backgroundColor:'white',height:'1.75rem',width:'1.75rem',borderRadius:'0.5rem'}}>
                    <img src={Camera} style={{ width: '1.6rem', height: '1.6rem', }} />
                </div>
                )}
                
                <input onChange={(e)=>uploadImage(e)} type="file" id="input-file-profile" style={{ display: 'none' }} />

            </div>
            {/* <UserImage height={'20vh'} width={'20vh'} /> */}
            <div className='top-profile-right-image'>
                <p style={{ fontSize: '1.75rem', color: 'white', fontWeight: 'bold' }}>Lai Quang Hai</p>
                <p style={{ fontSize: '1rem', color: '#a2aeb8' }}>636 Người bạn</p>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0.5rem' }}>
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