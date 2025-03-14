import React from "react";
import FacebookIcon from "../assets/FacebookIcon.png";

interface UserImageProps extends React.ImgHTMLAttributes<HTMLImageElement>{
    width: number | string;
    height: number | string;
    minWidth?:number|string;
    minHeight?:number|string
    className?:string
    
}

const UserImage = ({width,height,className='icon-round-background',minHeight,minWidth,children,...other}:UserImageProps) => {
    return ( 
        <div className={className}  style={{width:width,height:height,minHeight:minHeight,minWidth:minWidth}} {...other}>

        <img src={FacebookIcon} style={{
            width: '115%',
            height: '115%',
            objectFit:'cover',
            display: 'block',
            position:'absolute',
            borderRadius:'50%',
            
        }} />
        {children}
    </div>
     );
}
 
export default UserImage;