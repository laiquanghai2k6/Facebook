import { JSX, useEffect, useRef, useState } from "react";

import Input from "../../component/Input";
import InputPassword from "../../component/InputPassword";
import FacebookButton, { BUTTON_TYPE } from "../../component/button/FacebookButton";
import { requestUser } from "../../service/service";
import axios from "axios";
import Error from "../../component/Error";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, User } from "../../slices/userSlice";
type loginData = {
    email:string,
    password:string,
    error:string
}
const Login = ():JSX.Element => {
    const [loginData,setLoginData] = useState<loginData>({
        email:'',
        password:'',
        error:''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const navigateCreate = ()=>{
        navigate('/register')
    }
     const submitHandler = async ()=>{
        try{

            const {data} = await requestUser.post('/login',loginData)
            dispatch(setUser(data as User))
            setLoginData((prev)=>({...prev,error:''}))
            navigate('/home')
        }catch(e:unknown){
            if(axios.isAxiosError(e)){
                setLoginData((prev)=>({...prev,error:e.response?.data}))
            }
        }   
     }
    return (
     <div className="login">
        <div className="text-login-container">
        <h1 className="facebook-text-login" style={{fontWeight:'900'}}>facebook</h1>
        <br />
        <h2 style={{fontSize:'3vh'}}>Facebook helps you connect and share with the people in your life.</h2>
        </div>
        <div className="auth-container">
            <div className="form-login-container">
                <Input type="email" id="email-login"
                 className="login-input"

                 onChange={(e)=>setLoginData((prev)=>({...prev,email:e.target.value}))}   
                 />
                <InputPassword  id="password-login" onChange={(e)=>setLoginData((prev)=>({...prev,password:e.target.value}))} />
                {loginData.error != '' && <Error text={loginData.error} />}
                <FacebookButton ButtonType={BUTTON_TYPE.basic} type='submit' isLoading={false} text="Log in" onClick={submitHandler}/>
                <h4 style={{color:'#0866ff',fontWeight:'400' ,marginTop:'3vh',cursor: 'pointer'}}> Forgotten password?</h4>
                <hr style={{marginTop:'3vh' ,border: "0.5px solid #dadde1", width: "90%"}}></hr>
                <FacebookButton onClick={navigateCreate} ButtonType={BUTTON_TYPE.create} style={{marginTop:'1vh'}} isLoading={false} text="Create new account"/>
                

            </div>
        </div>
    </div> );
}
 
export default Login;