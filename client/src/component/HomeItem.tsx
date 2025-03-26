import React, { ButtonHTMLAttributes, MouseEventHandler } from "react";

interface HomeItemProps extends ButtonHTMLAttributes<HTMLDivElement>{
    img:string
    text?:string,
    styleImg?:React.CSSProperties
    styleContainer?:React.CSSProperties
    styleText?:React.CSSProperties,
    onClick?:MouseEventHandler<HTMLDivElement> | undefined
    className?:string

    

}


const HomeItem:React.FC<HomeItemProps> = ({children,className='',img,styleImg={height:'2.5rem',width:'2.5rem'},text,styleContainer,styleText,onClick}) => {
    return (
        <div className={`left-home-items${className}`} style={styleContainer} onClick={onClick}>
            <img src={img} style={styleImg} />
            <p className="left-home-text" style={styleText}>{text}</p>
            {children}
        </div>
    );
}

export default HomeItem;