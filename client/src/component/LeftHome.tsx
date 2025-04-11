import UserImage from "./UserImage";

import FaUsers from '../assets/social-media.png'
import FaClock from '../assets/memories.png'
import FaBookmark from '../assets/saved.png'
import FaUsersCog from '../assets/group.png'
import FaVideo from '../assets/video.png'
import FaStore from '../assets/market.png'
import FaNewspaper from '../assets/feed.png'
import HomeItem from "./HomeItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../selector/userSelector";
import DefaultImage from '../assets/default-image.png'
import { useNavigate } from "react-router-dom";
import { navigateHome } from "../slices/homeNavigateSlice";
type LeftHomeProps={
  
}
export const NotUpdateYet = ()=>{
    alert("Chức năng sẽ cập nhật sau")
}

const LeftHome:React.FC<LeftHomeProps> = () => {
    const user = useSelector(selectUserInfo)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const GoToFriend = ()=>{
        navigate('/profile')
    }
  
    return (
        <div className="left-home">
            
            <div className="left-home-items" onClick={()=>{
                dispatch(navigateHome('profile'))
                navigate('/profile')
                }}>
                <UserImage img={user.image == "" ? DefaultImage : user.image} height={'2.5rem'} width={'2.5rem'} />
                <p className="left-home-text">{`${user.name}`}</p>
            </div>
            <HomeItem
            onClick={()=>GoToFriend(

            )}
            img={FaUsers} text="Bạn bè" styleContainer={{padding:'0.5rem 0'}} />
            <HomeItem onClick={()=>NotUpdateYet()} img={FaClock} text="Kỷ niệm" styleContainer={{padding:'0.5rem 0'}}/>
            <HomeItem onClick={()=>NotUpdateYet()} img={FaBookmark} text="Đã lưu" styleContainer={{padding:'0.5rem 0'}} />
            <HomeItem onClick={()=>NotUpdateYet()} img={FaUsersCog} text="Nhóm" styleContainer={{padding:'0.5rem 0'}} />
            <HomeItem onClick={()=>NotUpdateYet()} img={FaVideo} text="Video"  styleContainer={{padding:'0.5rem 0'}}/>
            <HomeItem onClick={()=>NotUpdateYet()} img={FaStore} text="Market place" styleContainer={{padding:'0.5rem 0'}} /> 
            <HomeItem onClick={()=>NotUpdateYet()} img={FaNewspaper} text="Bảng feed" styleContainer={{padding:'0.5rem 0'}} /> 


    
         
            
            
        </div>
        );
}

export default LeftHome;