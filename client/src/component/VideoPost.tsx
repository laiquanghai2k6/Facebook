interface VideoPostProps {
    src: string
}

const VideoPost: React.FC<VideoPostProps> = ({ src }) => {
    return (
        <div style={{backgroundColor:'black',height:'30rem'}}>

            <div className="image-post">
                <video src={src} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} ></video>
            </div>
        </div>

    );
}

export default VideoPost;