import HomeItem from "./HomeItem";
import Hr from "./Hr";
import Input from "./Input";
import UserImage from "./UserImage";
import Video from '../assets/video-stream.png'
import Smile from '../assets/smile.png'
import Photo from '../assets/photos.png'
const CreatePost = () => {
    return (
        <div className="create-post-container">
            <div style={{display:'flex',flexDirection:'row'}}>
                <UserImage width={'5vh'} height={'5vh'} />
                <Input type="text" className="home-input" style={{flex:'1',marginLeft:'2vh'}} height={'7vh'} placeholder="Quang Hải ơi, bạn đang nghĩ gì"/>
            </div>
            <Hr style={{marginTop:'1vh'}}/>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:'2vh'}}>
                <HomeItem text="Video trực tiếp" img={Video} styleText={{marginLeft:'0.3vw',fontSize:'1.8vh'}} styleImg={{height:'3vh',width:'4vh'}} />
                <HomeItem text="Ảnh/video" img={Photo} styleText={{marginLeft:'0.3vw',fontSize:'1.8vh'}} styleImg={{height:'4vh',width:'5vh'}} />
                <HomeItem text="Cảm xúc/hoạt động" img={Smile} styleText={{marginLeft:'0.3vw',fontSize:'1.8vh'}} styleImg={{height:'3vh',width:'3vh'}} />

            </div>
        </div>
    );
}

export default CreatePost;