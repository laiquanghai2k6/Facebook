import UserImage from "./UserImage";

import FaUsers from '../assets/social-media.png'
import FaClock from '../assets/memories.png'
import FaBookmark from '../assets/saved.png'
import FaUsersCog from '../assets/group.png'
import FaVideo from '../assets/video.png'
import FaStore from '../assets/market.png'
import FaNewspaper from '../assets/feed.png'
import HomeItem from "./HomeItem";

const LeftHome = () => {
    return (
        <div className="left-home">
            
            <div className="left-home-items">
                <UserImage height={'5vh'} width={'5vh'} />
                <p className="left-home-text">Lại Quang Hải</p>
            </div>
            <HomeItem img={FaUsers} text="Bạn bè" styleContainer={{padding:'1vh 0'}} />
            <HomeItem img={FaClock} text="Kỷ niệm" styleContainer={{padding:'1vh 0'}}/>
            <HomeItem img={FaBookmark} text="Đã lưu" styleContainer={{padding:'1vh 0'}} />
            <HomeItem img={FaUsersCog} text="Nhóm" styleContainer={{padding:'1vh 0'}} />
            <HomeItem img={FaVideo} text="Video"  styleContainer={{padding:'1vh 0'}}/>
            <HomeItem img={FaStore} text="Market place" styleContainer={{padding:'1vh 0'}} /> 
            <HomeItem img={FaNewspaper} text="Bảng feed" styleContainer={{padding:'1vh 0'}} /> 


    
         
            
            
        </div>
        );
}

export default LeftHome;