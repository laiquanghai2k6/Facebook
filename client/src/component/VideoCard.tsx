import InteractPost from "./InteractPost";
import Media from "./Media";
import TextPost from "./TextPost";
import UserPost from "./UserPost";

const VideoCard = () => {
    return (
        <div className="video-card">
            <UserPost />
            <TextPost />
            <Media />
            <InteractPost />
            


        </div>
    );
}

export default VideoCard;