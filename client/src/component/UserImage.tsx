import React from "react";
import FacebookIcon from "../assets/FacebookIcon.png";

interface UserImageProps extends React.ImgHTMLAttributes<HTMLImageElement>{
    width: number | string;
    height: number | string;
}

const UserImage = ({width,height}:UserImageProps) => {
    return ( 
        <div className="icon-round-background" style={{width:width,height:height}}>

        <img src={FacebookIcon} style={{
            width: '110%',
            height: '110%',
            objectFit:'cover',
            display: 'block',
            position:'absolute',
            borderRadius:'50%',
            
        }} />
    </div>
     );
}
 
export default UserImage;