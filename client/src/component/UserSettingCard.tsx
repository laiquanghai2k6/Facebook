import HomeItem from './HomeItem';
import Logout from '../assets/logout.png'
import UserImage from './UserImage';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../selector/userSelector';
import Default from '../assets/default-image.png'
import { useNavigate } from 'react-router-dom';
import { initialUser, setUser } from '../slices/userSlice';
import { requestUser } from '../service/service';
const UserSettingCard = () => {
    const user = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const updateLastOnline = async () => {
        try {
            const time = Date.now()
            const data = {
                userId: user._id,
                time: time
            }
        await requestUser.put('/updateLastOnline', data)
        } catch (e) {
            console.log(e)
            alert('Lỗi hiển thị')
        }
    }
    const signOut = async () => {
        await requestUser.get('/logoutUser')
        await updateLastOnline()
        dispatch(setUser(initialUser.getUser))
        navigate('/login')
    }
    return (
        <>
            <div className="user-setting-card" onClick={() => navigate('/profile')}>
                <UserImage classNameImg='setting-icon' img={user.image != "" ? user.image : Default} height={'2.5rem'} width={'2.5rem'} />
                <p style={{ color: 'white', marginLeft: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>{user.name}</p>

            </div>
            <div className='user-setting-card' onClick={signOut}>
                <HomeItem img={Logout} text='Đăng xuất' styleContainer={{ alignItems: 'center', justifyContent: 'center' }} styleText={{ color: 'white' }} className='-sign-out' />
            </div>
        </>
    );
}

export default UserSettingCard;