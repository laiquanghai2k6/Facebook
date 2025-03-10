import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: React.HTMLInputTypeAttribute;
    className:string,
    style?:React.CSSProperties;
}

const Input:React.FC<InputProps> = ({className,type,style,...other}) => {
    return ( 
    <>
    <input className={className} type={type} style={style} {...other} />
    </>
     );
}
 
export default Input;