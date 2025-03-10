import React, { ButtonHTMLAttributes } from "react";
interface EmojiPostProps extends ButtonHTMLAttributes<HTMLImageElement>{
    img:string,
    style:React.CSSProperties,
    
}

const EmojiPost:React.FC<EmojiPostProps> = ({img,style,...other}) => {
    return (  
        
            <img src={img} style={style} className="emoji-post" {...other} />
        
    );
}
 
export default EmojiPost;