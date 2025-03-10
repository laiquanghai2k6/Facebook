interface ImagePostProps {
    img: string
}

const ImagePost: React.FC<ImagePostProps> = ({ img }) => {
    return (
        <div style={{backgroundColor:'black',height:'60vh'}}>

            <div className="image-post">
                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
        </div>

    );
}

export default ImagePost;