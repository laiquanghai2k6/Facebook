import React, { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    value: string,
    onHandler: Function,
    month?: boolean,
    length: number,
    start: number
}
const Months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

const Select: React.FC<SelectProps> = ({ value, onHandler, month = false, length, start, ...other }) => {
    return (
        <select value={value} onChange={(e) => onHandler(e.target.value)} {...other} className="login-input" style={{width:'17vh',height:'5vh',marginBottom:'0',padding:'0'}}>

            {!month ? Array.from({ length: length }, (_, i) => start - i).map((val) => (
                <option key={val} value={val}>
                    {val}
                </option>
            )) : (
                Months.map((month, i) => (
                    <option key={i} value={i+1}>
                        {month}
                    </option>
                ))
            )}




        </select>
    );
}

export default Select;