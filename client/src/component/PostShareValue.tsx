import test from '../assets/test2.png'
import { PostShareType } from '../slices/postSlice';
import ImagePostShare from "./ImagePostShare";
import TextPost from './TextPost';
import UserPost from './UserPost';
import VideoPostShare from './VideoPostShare';

type PostShareValueProps = {
    post:PostShareType
    type?:string
}

const PostShareValue = ({post,type}:PostShareValueProps) => {

    return (
        <div className="post-share-value">
            <div style={{display:'flex',width:'95%',borderRadius:'1rem',border: '1px #65686c solid',flexDirection:'column'}}>

                { post.image && <ImagePostShare img={post.image} />}
                {post.video && <VideoPostShare  src={post.video} />}
                <UserPost userId={post.userIdShare} time={post.createdOrigin}/>
                {type=="yes" ?  <div className="text-post-container">
                    <p className={`text-post-comment `}>{post.text}</p>

                </div>
                :(
                    <TextPost  text={post.text} />
                )
                }
            </div>
        </div>
    );
}

export default PostShareValue;