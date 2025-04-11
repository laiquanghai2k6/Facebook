import { JSX, useState } from "react";

import Input from "../../component/Input";
import InputPassword from "../../component/InputPassword";
import FacebookButton, { BUTTON_TYPE } from "../../component/button/FacebookButton";
import {  requestUser } from "../../service/service";
import axios from "axios";
import Error from "../../component/Error";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, User } from "../../slices/userSlice";
import Spinner from "../../component/Spinner";
import { setToken } from "../../slices/tokenSlice";


type loginData = {
    email: string,
    password: string,
    error: string
}
const Login = (): JSX.Element => {
    const [loginData, setLoginData] = useState<loginData>({
        email: '',
        password: '',
        error: ''
    })
   
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const navigateCreate = () => {
        navigate('/register')
    }
    const submitHandler = async () => {
        try {
            setLoading(true)


            const response = await requestUser.post('/login', loginData)
            setLoginData((prev) => ({ ...prev, error: '' }))
            
            dispatch(setUser(response.data.user as User))
            dispatch(setToken(response.data.accessToken))
            setLoading(false)
            document.documentElement.style.backgroundColor = "#1c1c1d";
            document.body.style.backgroundColor = "#1c1c1d";
            navigate('/home')

        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                setLoginData((prev) => ({ ...prev, error: e.response?.data }))
            }
            setLoading(false)
        }
    }

    return (
        <div className="login">
            {loading && <Spinner />}
            <div className="text-login-container">
                <h1 className="facebook-text-login" style={{ fontWeight: '900' }}>facebook</h1>
                <br />
                <h2 style={{ fontSize: '1.5rem' }}>Đây chỉ là sản phẩm cá nhân của LQH, không phải là Facebook thật</h2>
            </div>
            <div className="auth-container">
                <div className="form-login-container">
                    <Input type="email" id="email-login"
                        className="login-input"

                        onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    <InputPassword id="password-login" onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))} />
                    {loginData.error != '' && <Error text={loginData.error} />}
                    <FacebookButton  ButtonType={BUTTON_TYPE.basic} type='submit' isLoading={false} text="Đăng nhập" onClick={submitHandler} />
                    {/* <h4 style={{ color: '#0866ff', fontWeight: '400', marginTop: '1.5rem', cursor: 'pointer' }}> Quên mật khẩu?</h4> */}
                    <hr style={{ marginTop: '1.5rem', border: "0.5px solid #dadde1", width: "90%" }}></hr>
                    <FacebookButton onClick={navigateCreate} ButtonType={BUTTON_TYPE.create} style={{ marginTop: '1vh' }} isLoading={false} text="Tạo tài khoản mới" />


                </div>
            </div>
        </div>);
}

export default Login;