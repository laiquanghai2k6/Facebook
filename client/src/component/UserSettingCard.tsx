import FacebookIcon from '../assets/FacebookIcon.png'
import HomeItem from './HomeItem';
import Logout from '../assets/logout.png'
import UserImage from './UserImage';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../selector/userSelector';
import Default from '../assets/default-image.png'
import { useNavigate } from 'react-router-dom';
import { initialUser, setUser } from '../slices/userSlice';
const UserSettingCard = () => {
    const user = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signOut = ()=>{
        dispatch(setUser(initialUser.getUser))
        navigate('/login')
    }
    return (
        <>
            <div className="user-setting-card" onClick={()=>navigate('/profile')}>
                <UserImage img={user.image!="" ? user.image : Default } height={'5vh'} width={'5vh'} />
                <p style={{ color: 'white', marginLeft: '2vh', fontSize: '2.5vh', fontWeight: 'bold' }}>Lại Quang Hải</p>

            </div>
            <div className='user-setting-card' onClick={signOut}>
                <HomeItem img={Logout} text='Đăng xuất' styleContainer={{alignItems:'center',justifyContent:'center'}} styleText={{color:'white'}} className='-sign-out' />
            </div>
        </>
    );
}

export default UserSettingCard;