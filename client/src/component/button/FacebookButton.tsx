import { CSSProperties, FC } from "react";
import { BasicButton, CreateButton } from "./button.styles";

export enum BUTTON_TYPE{
    basic='basic',
    create='create'
}
const getButton = (ButtonType=BUTTON_TYPE.basic)=>(
    {
        [BUTTON_TYPE.basic]:BasicButton,
        [BUTTON_TYPE.create]:CreateButton,
    }[ButtonType]
)

export type FacebookButtonProps={
    ButtonType:BUTTON_TYPE,
    text:string,
    isLoading:boolean,
    style?:React.CSSProperties
}

const FacebookButton:FC<FacebookButtonProps> = ({ButtonType,text,isLoading,style}:FacebookButtonProps) => {
    const CustomButton = getButton(ButtonType)
    return (<>
        <CustomButton style={style}>
            {text}
        </CustomButton>
    </>  );
}
 
export default FacebookButton;