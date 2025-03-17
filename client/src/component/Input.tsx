import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: React.HTMLInputTypeAttribute;
    className:string,
    style?:React.CSSProperties;
    ref?:React.Ref<HTMLInputElement>
}

const Input:React.FC<InputProps> = ({className,type,style,ref,...other}) => {
    return ( 
    <>
    <input ref={ref} className={className} type={type} style={style} {...other} />
    </>
     );
}
 
export default Input;