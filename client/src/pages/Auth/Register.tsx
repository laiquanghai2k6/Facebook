import  { useCallback, useEffect, useState } from "react";
import Select from '../../component/Select'
import Input from "../../component/Input";
import "react-datepicker/dist/react-datepicker.css";
import FacebookButton, { BUTTON_TYPE } from "../../component/button/FacebookButton";
import Error from "../../component/Error";
import axios from "axios";
import { requestUser } from "../../service/service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, User } from "../../slices/userSlice";
import Spinner from "../../component/Spinner";




type RegisterType = {
    lastName: string,
    firstName: string,
    day: string,
    month: string,
    year: string,
    gender: string,
    email: string,
    password: string
}

const Register = () => {
    const [isFull,setIsFull] = useState(false)
    const [error,setError] = useState(null)
    const [loading,isLoading] = useState(false)

    const [registerInfo, setRegisterInfo] = useState<RegisterType>({
        day: "1",
        month: "1",
        year: "2025",
        gender: "",
        lastName: "",
        firstName: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        const isFullInfo = Object.values(registerInfo).every(value=>value!="")
        setIsFull(isFullInfo)
    },[registerInfo])

    const changeRegisterInfo = useCallback((type: string, value: string) => {
        switch (type) {
            case 'day':
                setRegisterInfo((prev) => ({ ...prev, day: value }))
                break;
            case 'month':
                setRegisterInfo((prev) => ({ ...prev, month: value }))
                break;
            case 'year':
                setRegisterInfo((prev) => ({ ...prev, year: value }))
                break;
            case 'firstName':
                setRegisterInfo((prev) => ({ ...prev, firstName: value }))
                break;
            case 'lastName':
                setRegisterInfo((prev) => ({ ...prev, lastName: value }))
                break;
            case 'gender':
                setRegisterInfo((prev) => ({ ...prev, gender: value }))
                break;
            case 'email':
                setRegisterInfo((prev) => ({ ...prev, email: value }))
                break;
            case 'password':
                setRegisterInfo((prev) => ({ ...prev, password: value }))
                break;
            default:
                break;
        }
    }, [])
    const registerHandler = async () => {
        try{
            const converDateRegister = {
                birth:`${registerInfo.day}/${registerInfo.month}/${registerInfo.year}`,
                gender: registerInfo.gender,
                name: registerInfo.firstName+registerInfo.lastName,
                email: registerInfo.email,
                password: registerInfo.password
            }
            isLoading(true)
            const {data} = await requestUser.post('/register',converDateRegister)
            dispatch(setUser(data as User))
            navigate('/home')
            document.documentElement.style.backgroundColor = "#1c1c1d";
            document.body.style.backgroundColor = "#1c1c1d";
            setError(null)
            isLoading(false)

        }catch(e){
            if(axios.isAxiosError(e)){
                setError(e.response?.data)
            }
            isLoading(false)
        }

        
    }
    return (
        <div className="register-container">
            {loading && <Spinner />}
            <div className="register">
                <p className="facebook-text-register">facebook</p>
                <div className="register-form">
                    <h2 style={{ marginTop: '1.5rem' }}>Tạo tài khoản mới</h2>
                    <hr style={{ width: '100%', border: '0.2px solid #dadde1', marginTop: '0.75rem' }} />
                    <div className="register-name">
                        <Input tabIndex={1} className="login-input-register" onChange={(e) => changeRegisterInfo('firstName', e.target.value)} type="text"   placeholder="Họ" />
                        <Input tabIndex={2}  className="login-input-register" onChange={(e) => changeRegisterInfo('lastName', e.target.value)} type="text"  placeholder="Tên" />
                    </div>
                    <p style={{ alignSelf: 'flex-start', marginLeft: '1rem', fontSize: '1.25rem' }}>
                        Ngày sinh
                    </p>
                    <div className="date-container">
                        <Select tabIndex={3}  value={registerInfo.day} onHandler={changeRegisterInfo} type="day" length={31} start={31} />
                        <Select tabIndex={4}  month={true} value={registerInfo.month} type="month" onHandler={changeRegisterInfo} length={130} start={2025} />
                        <Select tabIndex={5}  value={registerInfo.year} onHandler={changeRegisterInfo} type="year" length={130} start={2025} />
                    </div>
                    <p style={{ alignSelf: 'flex-start', marginLeft: '1rem', fontSize: '1.25rem' }}>
                        Giới tính
                    </p>
                    <div className="gender-container">
                        <label tabIndex={6} className="label-gender-register">Nữ<Input value='Nữ' onChange={(e) => changeRegisterInfo('gender', e.target.value)} className="register-gender" type="radio" name="gender" style={{ width: '1rem', margin: '0 0.5rem' }} /></label>
                        <label tabIndex={7} className="label-gender-register">Nam<Input value='Nam' onChange={(e) => changeRegisterInfo('gender', e.target.value)} className="register-gender" type="radio" name="gender" style={{ width: '1rem', margin: '0 0.5rem' }} /></label>
                        <label tabIndex={8} className="label-gender-register">Tùy chỉnh<Input value='Tùy chọn' onChange={(e) => changeRegisterInfo('gender', e.target.value)} className="register-gender" type="radio" name="gender" style={{ width: '1rem', margin: '0 0.5rem' }} /></label>
                    </div>
                    <div style={{padding:'0 1rem',width:'100%'}}>

                    <Input tabIndex={9}  type="email" onChange={(e) => changeRegisterInfo('email', e.target.value)} className="login-input" style={{ height: '2.5rem', width:'100%', marginTop: '1.5rem' }} placeholder="Tài khoản email" />
                    </div>
                    <div style={{padding:'0 1rem',width:'100%'}}>
                    <Input tabIndex={10}  type="password" onChange={(e) => changeRegisterInfo('password', e.target.value)} className="login-input" style={{ height: '2.5rem', width: '100%', marginBottom: '1rem' }} placeholder="Mật khẩu mới" />
                    </div>
                  
                    {error && <Error text={error} />}
                    {isFull ? (

                        <FacebookButton tabIndex={11} ButtonType={BUTTON_TYPE.create} isLoading={false} text="Tạo" type="submit" onClick={registerHandler} />
                    ):(
                        <FacebookButton tabIndex={11} ButtonType={BUTTON_TYPE.cancel} isLoading={false} text="Tạo" type="submit" onClick={()=>alert('Vui lòng điền đầy đủ')} />

                    )}
                    <p className="text-click" onClick={()=>navigate('/')}>
                        Bạn có sẵn tài khoản rồi?
                    </p>



                </div>
            </div>
        </div>);
}

export default Register;