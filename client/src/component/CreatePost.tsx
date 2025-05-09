import HomeItem from "./HomeItem";
import Hr from "./Hr";
import Input from "./Input";
import UserImage from "./UserImage";
import Video from '../assets/video-stream.png'
import Smile from '../assets/smile.png'
import Photo from '../assets/photos.png'
import Default from '../assets/default-image.png'
import { useSelector } from "react-redux";
import { selectUserInfo } from "../selector/userSelector";

type CreatePostProps = {
    setCreatePostModal:Function
}

const CreatePost = ({setCreatePostModal}:CreatePostProps) => {
    
    const user = useSelector(selectUserInfo)
   
    return (
        <div className="create-post-container" onClick={()=>setCreatePostModal(true)}>
           
            <div style={{display:'flex',flexDirection:'row'}}>
                <UserImage img={user.image == "" ? Default : user.image} width={'2.5rem'} height={'2.5rem'} />
                <Input  defaultValue="" type="text" className="home-input" style={{flex:'1',marginLeft:'1rem'}} height={'3.5rem'} placeholder={`${user.name} ơi, bạn đang nghĩ gì`}/>
            </div>
            <Hr style={{marginTop:'0.5rem'}}/>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',marginTop:'0.25rem'}}>
                <HomeItem classNameText={'create-post-text'}  onClick={(e)=>{alert('Chức năng sẽ được cập nhật')
                    e.stopPropagation()
                }} text="Video trực tiếp" img={Video} styleText={{marginLeft:'0.3rem'}} styleImg={{height:'1.5rem',width:'2rem'}} />
                <HomeItem classNameText={'create-post-text'} onClick={()=>{
                    setCreatePostModal(true)
               
                }} text="Ảnh/video" img={Photo} styleText={{marginLeft:'0.3rem'}} styleImg={{height:'2rem',width:'2.5rem'}} />
                <HomeItem 
                id="emoji-create-post"
                classNameText={'create-post-text'} onClick={()=>setCreatePostModal(true)} text="Cảm xúc/hoạt động" img={Smile} styleText={{marginLeft:'0.3rem'}} styleImg={{height:'1.5rem',width:'1.5rem'}} />

            </div>
        </div>
    );
}

export default CreatePost;