import React, {  ChangeEventHandler, useState } from "react";
import { FaRegEye ,FaRegEyeSlash } from "react-icons/fa";

interface InputPasswordProps{
    onChange:ChangeEventHandler<HTMLInputElement>
    id:string
}

const InputPassword:React.FC<InputPasswordProps> = ({onChange,id}) => {
    const [isHidePassword,setIsHidePassword] = useState(true)
    const hidePasswordHandler = ()=>{
        setIsHidePassword(!isHidePassword)
    }
    return (  
        <div className="password-container">

        <input className="login-input" id={id} type={isHidePassword ? "password" :"text"} onChange={onChange}  />
        {
            isHidePassword ? (
                <FaRegEye className="eye-icon" onClick={hidePasswordHandler}/>

            ):(
                 <FaRegEyeSlash className="eye-icon" onClick={hidePasswordHandler} />

            )
        }
        
        </div>
    );
}
 
export default InputPassword;