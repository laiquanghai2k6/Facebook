import React from "react";
interface ErrorProps {
    text: string
}
const Error: React.FC<ErrorProps> = ({ text }) => {
    return (
        <div style={{backgroundColor:'#D32F2F',height:'2.5rem',width:'auto',margin:'1vh 0 1vh 0',padding:'1vh',borderRadius:'1vh'}}>
            <p style={{color:'white',fontSize:'2vh'}}>{text}</p>
        </div>);
}

export
    default Error;