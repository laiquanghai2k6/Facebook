import React from "react";

interface HrProps{
    style?:React.CSSProperties
}

const Hr:React.FC<HrProps> = ({style}) => {
    return (
        <hr className="hr-facebook-home" style={style}/>
      );
}
 
export default Hr;
