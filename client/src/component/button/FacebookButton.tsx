import { ButtonHTMLAttributes, CSSProperties, FC } from "react";
import { BasicButton, CancelButton, CreateButton } from "./button.styles";

export enum BUTTON_TYPE{
    basic='basic',
    create='create',
    cancel='cancel'
}
const getButton = (ButtonType=BUTTON_TYPE.basic)=>(
    {
        [BUTTON_TYPE.basic]:BasicButton,
        [BUTTON_TYPE.create]:CreateButton,
        [BUTTON_TYPE.cancel]:CancelButton,
    }[ButtonType]
)

export interface FacebookButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    ButtonType:BUTTON_TYPE,
    text:string,
    isLoading?:boolean,
    style?:React.CSSProperties
}

const FacebookButton:FC<FacebookButtonProps> = ({ButtonType,text,isLoading,style,...other}:FacebookButtonProps) => {
    const CustomButton = getButton(ButtonType)
    return (<>
        <CustomButton {...other} style={style}>
            {text}
        </CustomButton>
    </>  );
}
 
export default FacebookButton;