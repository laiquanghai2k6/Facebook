import UserImage from "./UserImage";
import Default from '../assets/default-image.png'

const LoadingPost = () => {
    return (
        <>
           <div className="post-loading-container">
            <div className="user-post-container">

                <UserImage img={Default} width={'2.5rem'} height={'2.5rem'} />
                <div style={{ flex: '1', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '1vh' }}>

                    <p className="loading-name-post"></p>
                    <p className="loading-time-post"></p>
                </div>
            </div>
            <div className="loading-image-post">
            </div>
        
            <div className="emoji-loading-post-container" >
                <div className="emoji-loading-post"></div>
                <div className="emoji-loading-post"></div>
                <div className="emoji-loading-post"></div>
            </div>
        </div>
        <div className="post-loading-container">
            <div className="user-post-container">

                <UserImage img={Default} width={'2.5rem'} height={'2.5rem'} />
                <div style={{ flex: '1', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '1vh' }}>

                    <p className="loading-name-post"></p>
                    <p className="loading-time-post"></p>
                </div>
            </div>
            <div className="loading-image-post">
            </div>
        
            <div className="emoji-loading-post-container" >
                <div className="emoji-loading-post"></div>
                <div className="emoji-loading-post"></div>
                <div className="emoji-loading-post"></div>
            </div>
        </div>
        <div style={{opacity:'0',height:'4rem',width:'2rem'}}>
        margin
        </div>
        </>
    );
}

export default LoadingPost;