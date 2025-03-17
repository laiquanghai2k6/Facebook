import React, { useCallback, useEffect, useState } from "react";
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
    
    const [registerInfo, setRegisterInfo] = useState<RegisterType>({
        day: "1",
        month: "Jan",
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
                birth:`${registerInfo.day}-${registerInfo.month}-${registerInfo.year}`,
                gender: registerInfo.gender,
                lastName: registerInfo.lastName,
                firstName: registerInfo.firstName,
                email: registerInfo.email,
                password: registerInfo.password
            }
            const {data} = await requestUser.post('/register',converDateRegister)
            
            dispatch(setUser(data as User))
            setError(null)
            navigate('/home')
        }catch(e){
            if(axios.isAxiosError(e)){
                setError(e.response?.data)
            }
        }

        
    }
    return (
        <div className="register-container">
            <div className="register">
                <p style={{ color: '#0866ff', fontWeight: '800', fontSize: '9vh', paddingBottom: '5vh' }}>facebook</p>
                <div className="register-form">
                    <h2 style={{ marginTop: '3vh' }}>Create a new account</h2>
                    <hr style={{ width: '100%', border: '0.2px solid #dadde1', marginTop: '1.5vh' }} />
                    <div className="register-name">
                        <Input tabIndex={1} className="login-input" onChange={(e) => changeRegisterInfo('lastName', e.target.value)} type="text" style={{ width: '30vh' }} placeholder="Last name" />
                        <Input tabIndex={2}  className="login-input" onChange={(e) => changeRegisterInfo('firstName', e.target.value)} type="text" style={{ width: '30vh' }} placeholder="First name" />
                    </div>
                    <p style={{ alignSelf: 'flex-start', marginLeft: '2vh', fontSize: '2.5vh' }}>
                        Date of birth
                    </p>
                    <div className="date-container">
                        <Select tabIndex={3}  value={registerInfo.day} onHandler={changeRegisterInfo} type="day" length={31} start={31} />
                        <Select tabIndex={4}  month={true} value={registerInfo.month} type="month" onHandler={changeRegisterInfo} length={130} start={2025} />
                        <Select tabIndex={5}  value={registerInfo.year} onHandler={changeRegisterInfo} type="year" length={130} start={2025} />
                    </div>
                    <p style={{ alignSelf: 'flex-start', marginLeft: '2vh', fontSize: '2.5vh' }}>
                        Gender
                    </p>
                    <div className="gender-container">
                        <label tabIndex={6} className="label-gender-register">Female<Input value='Female' onChange={(e) => changeRegisterInfo('gender', e.target.value)} className="register-gender" type="radio" name="gender" style={{ width: '2vh', margin: '0 1vh' }} /></label>
                        <label tabIndex={7} className="label-gender-register">Male<Input value='Male' onChange={(e) => changeRegisterInfo('gender', e.target.value)} className="register-gender" type="radio" name="gender" style={{ width: '2vh', margin: '0 1vh' }} /></label>
                        <label tabIndex={8} className="label-gender-register">Custom<Input value='Custom' onChange={(e) => changeRegisterInfo('gender', e.target.value)} className="register-gender" type="radio" name="gender" style={{ width: '2vh', margin: '0 1vh' }} /></label>
                    </div>
                    <Input tabIndex={9}  type="email" onChange={(e) => changeRegisterInfo('email', e.target.value)} className="login-input" style={{ height: '5vh', width: '57vh', marginTop: '3vh' }} placeholder="Email address" />
                    <Input tabIndex={10}  type="password" onChange={(e) => changeRegisterInfo('password', e.target.value)} className="login-input" style={{ height: '5vh', width: '57vh', marginBottom: '2vh' }} placeholder="New password" />
                    {error && <Error text={error} />}
                    {isFull ? (

                        <FacebookButton tabIndex={11} ButtonType={BUTTON_TYPE.create} isLoading={false} text="Create" type="submit" onClick={registerHandler} />
                    ):(
                        <FacebookButton tabIndex={11} ButtonType={BUTTON_TYPE.cancel} isLoading={false} text="Create" type="submit" onClick={()=>alert('Vui lòng điền đầy đủ')} />

                    )}
                    <p className="text-click" onClick={()=>navigate('/')}>
                        Already have an account?
                    </p>



                </div>
            </div>
        </div>);
}

export default Register;