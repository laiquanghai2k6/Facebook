import { useDispatch, useSelector } from 'react-redux';
import defaultImage from '../assets/defaul.jpg'
import { setUserBackground, User } from '../slices/userSlice';
import { selectUserInfo } from '../selector/userSelector';
import { requestUser } from '../service/service';
import { ChangeEvent, useState } from 'react';
import Camera from '../assets/camera-black.png'
type NavProfileProp = {
    type?: string
}

const NavProfile = ({ type = "own" }: NavProfileProp) => {

    const user = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    const [loading, isLoading] = useState(false)
    const uploadBackground = async (e: ChangeEvent<HTMLInputElement>) => {
        try {

            const data = new FormData()
            data.append('image', e.target.files?.[0] as File)
            data.append('userId', user._id)
            isLoading(true)
            const response = await requestUser.post('/uploadBackgroundImage', data)
            dispatch(setUserBackground(response.data))
            isLoading(false)
        } catch (e) {
            alert('Tải ảnh không thành công')
        }
    }
    return (
        <div className="nav-profile">
            <div className='image-profile' >
                {type == "own" && (
                    <>
                        <div className='top-profile-camera' onClick={() => {
                            document.getElementById('upload-background')?.click()
                        }}>
                            <img src={Camera} style={{ width: '1.5rem', height: '1.5rem', color: 'black' }} />
                            <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>Chỉnh sửa ảnh bìa</p>
                        </div>
                        <input id="upload-background" type="file" onChange={(e) => { uploadBackground(e) }} style={{ display: 'none' }} />
                    </>
                )}

                <div className="image-post">
                    {user.backgroundImage != "" && <img src={user.backgroundImage} style={{ width: '50rem', height: '100%', objectFit: 'contain' }} />}

                </div>
            </div>
        </div>

    );
}

export default NavProfile;