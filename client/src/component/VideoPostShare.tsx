import React from "react";

interface VideoPostShareProps {
    src: string
}


const VideoPostShare:React.FC<VideoPostShareProps>= ({src}) => {
    return (
        <div style={{backgroundColor:'black',height:'27rem',borderRadius:'1rem'}}>

            <div className="image-post">
                <video src={src} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} ></video>
            </div>
        </div>

    );
}
 
export default VideoPostShare;