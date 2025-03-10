import { useState } from "react";
import { FaRegEye ,FaRegEyeSlash } from "react-icons/fa";
const InputPassword = () => {
    const [isHidePassword,setIsHidePassword] = useState(true)
    const hidePasswordHandler = ()=>{
        setIsHidePassword(!isHidePassword)
    }
    return (  
        <div className="password-container">

        <input className="login-input" type={isHidePassword ? "password" :"text"} />
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