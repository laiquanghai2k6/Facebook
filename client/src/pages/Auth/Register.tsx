import React, { useState } from "react";
import Select from '../../component/Select'
import Input from "../../component/Input";
import "react-datepicker/dist/react-datepicker.css";
import FacebookButton, { BUTTON_TYPE } from "../../component/button/FacebookButton";




const Register = () => {
    const [day, setDay] = useState("1");
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("2025")
    const [gender,setGender] = useState("")
    console.log(gender)
    return (
        <div className="register-container">
            <div className="register">
                <p style={{ color: '#0866ff', fontWeight: '800', fontSize: '9vh', paddingBottom: '5vh' }}>facebook</p>
                <div className="register-form">
                    <h2 style={{ marginTop: '3vh' }}>Create a new account</h2>
                    <hr style={{ width: '100%', border: '0.2px solid #dadde1', marginTop: '1.5vh' }} />
                    <div className="register-name">
                        <Input className="login-input" type="text" style={{ width: '30vh' }} placeholder="Last name" />
                        <Input className="login-input" type="text" style={{ width: '30vh' }} placeholder="First name" />
                    </div>
                    <p style={{ alignSelf:'flex-start',marginLeft:'2vh',fontSize:'2.5vh'}}>
                        Date of birth
                    </p>
                    <div className="date-container">
                        <Select value={day} onHandler={setDay} length={31} start={31} />
                        <Select value={year} onHandler={setYear} length={130} start={2025} />
                        <Select month={true} value={month} onHandler={setMonth} length={130} start={2025} />
                    </div>
                    <p style={{ alignSelf:'flex-start',marginLeft:'2vh',fontSize:'2.5vh'}}>
                        Gender
                    </p>
                    <div className="gender-container">
                        <label  className="label-gender-register">Female<Input value='Female' onChange={(e)=>setGender(e.target.value)} className="register-gender" type="radio" name="gender" style={{width:'2vh',margin:'0 1vh'}} /></label>
                        <label  className="label-gender-register">Male<Input value='Male' onChange={(e)=>setGender(e.target.value)} className="register-gender" type="radio" name="gender" style={{width:'2vh',margin:'0 1vh'}} /></label>
                        <label  className="label-gender-register">Custom<Input value='Custom' onChange={(e)=>setGender(e.target.value)} className="register-gender" type="radio"name="gender" style={{width:'2vh',margin:'0 1vh'}} /></label>
                    </div>
                    <Input type="email" className="login-input" style={{height:'5vh',width:'57vh',marginTop:'3vh'}} placeholder="Email address" />
                    <Input type="password" className="login-input" style={{height:'5vh',width:'57vh',marginBottom:'2vh'}} placeholder="New password" />
                    <FacebookButton ButtonType={BUTTON_TYPE.create} isLoading={false} text="Create" />
                    <p style={{cursor:'pointer', color:'#0866ff', fontWeight:'400',marginTop:'2vh' }}>
                        Already have an account?
                    </p>



                </div>
            </div>
        </div>);
}

export default Register;