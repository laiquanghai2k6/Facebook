import CreatePost from "./CreatePost";
import Post from "./Post";

const MidHome = () => {
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