interface ImagePostShareProps {
    img: string
}

const ImagePostShare: React.FC<ImagePostShareProps> = ({ img }) => {
    return (
        <div style={{backgroundColor:'black',height:'27rem',borderRadius:'1rem'}}>

            <div className="image-post">
                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            
        </div>

    );
}

export default ImagePostShare;