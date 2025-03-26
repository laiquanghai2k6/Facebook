import React, { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    value: string,
    onHandler: Function,
    month?: boolean,
    length: number,
    start: number,
    type:string
}
const Months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
];

const Select: React.FC<SelectProps> = ({ value,type, onHandler, month = false, length, start, ...other }) => {
    return (
        <select value={value} onChange={(e) => onHandler(type,e.target.value)} className="login-input" style={{width:'17vh',height:'5vh',marginBottom:'0',padding:'0'}}  {...other}>

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