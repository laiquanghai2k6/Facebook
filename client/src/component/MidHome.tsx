import { User } from "../slices/userSlice";
import CreatePost from "./CreatePost";
import Post from "./Post";
type MidHomeProps={
    user:User
}

const MidHome:React.FC<MidHomeProps> = ({user}) => {
    return ( 
        <div className="mid-home">
            <CreatePost />

            <div className="post-list-container">

            <Post />
            <Post />
            <Post />

            <p>sad</p>
            </div>

           
        </div>
     );
}
 
export default MidHome;