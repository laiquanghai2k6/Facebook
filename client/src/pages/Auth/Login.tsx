import { JSX } from "react";

import Input from "../../component/Input";
import InputPassword from "../../component/InputPassword";
import FacebookButton, { BUTTON_TYPE } from "../../component/button/FacebookButton";
const Login = ():JSX.Element => {
    return (
     <div className="login">
        <div className="text-login-container">
        <h1 className="facebook-text-login" style={{fontWeight:'900'}}>facebook</h1>
        <br />
        <h2 style={{fontSize:'3vh'}}>Facebook helps you connect and share with the people in your life.</h2>
        </div>
        <div className="auth-container">
            <div className="form-login-container">
                <Input type="email" className="login-input"/>
                <InputPassword />
                <FacebookButton ButtonType={BUTTON_TYPE.basic} isLoading={false} text="Log in"/>
                <h4 style={{color:'#0866ff',fontWeight:'400' ,marginTop:'3vh',cursor: 'pointer'}}> Forgotten password?</h4>
                <hr style={{marginTop:'3vh' ,border: "0.5px solid #dadde1", width: "90%"}}></hr>
                <FacebookButton ButtonType={BUTTON_TYPE.create} isLoading={false} text="Create new account"/>
                

            </div>
        </div>
    </div> );
}
 
export default Login;