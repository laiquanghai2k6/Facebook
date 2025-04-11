import { useDispatch } from 'react-redux';
import { setUserBackground, User, UserInfo } from '../slices/userSlice';
import { requestUser } from '../service/service';
import { ChangeEvent, useEffect, useState } from 'react';
import Camera from '../assets/camera-black.png'
import Spinner from './Spinner';
type NavProfileProp = {
    type?: string
    user: User | UserInfo
}

const NavProfile = ({ type = "own", user }: NavProfileProp) => {

    const dispatch = useDispatch()
    const [currentImage,setCurrentImage] = useState("")
    const [loading, isLoading] = useState(false)
    const uploadBackground = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if ((e.target.files?.[0] as File).type.startsWith('image/')) {
                const data = new FormData()
                data.append('image', e.target.files?.[0] as File)
                data.append('userId', user._id)
                isLoading(true)
                const response = await requestUser.post('/uploadBackgroundImage', data)
                dispatch(setUserBackground(response.data))
                isLoading(false)
                const url = URL.createObjectURL(e.target.files?.[0] as File)
                setCurrentImage(url)
            } else {
                alert('Vui lòng chọn ảnh')
            }

        } catch (e) {
            alert('Tải ảnh không thành công')
        }
    }
    useEffect(()=>{
        setCurrentImage(user.backgroundImage)
    },[user])
    return (
        <div className="nav-profile">
            {loading && <Spinner />}
            <div className='image-profile' >
                {type == "own" && (
                    <>

                        <div className='top-profile-camera' onClick={() => {
                            document.getElementById('upload-background')?.click()
                        }}>

                            <img src={Camera} style={{ width: '1.5rem', height: '1.5rem', color: 'black' }} />
                            <p style={{ fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>Chỉnh sửa ảnh bìa</p>
                        </div>

                        <input id="upload-background" type="file" onChange={(e) => { uploadBackground(e) }} style={{ display: 'none' }} />

                    </>
                )}

                <div className="image-post">
                    {currentImage != "" && <img src={currentImage} className='image-background' />}

                </div>
            </div>
        </div>

    );
}

export default NavProfile;