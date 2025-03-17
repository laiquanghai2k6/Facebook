
import media from '../assets/da-lo-yeu-em.mp4'
const Media = () => {
    console.log(media)
    return (  
        <div className="media">
            <video src={media} controls style={{width:'100%',height:'60vh',objectFit:'contain'}} />
        </div>
    );
}
 
export default Media;