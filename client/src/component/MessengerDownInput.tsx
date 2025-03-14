import React, { TextareaHTMLAttributes, useEffect } from 'react';
import Camera from '../assets/camera.png'
import Send from '../assets/send.png'
import HomeItem from './HomeItem';
interface MessengerDownInputProps{
    keys:number
}

const MessengerDownInput:React.FC<MessengerDownInputProps> = ({keys}) => {
    useEffect(()=>{
        const textArea = document.getElementById(`messenger-down-card-input-bar-${keys}`)
        
        if(textArea){
            
            textArea.addEventListener('input',function(){
                (this as HTMLTextAreaElement).rows = 1;
                const computedStyle = window.getComputedStyle(this)
                let lineHeight = parseFloat(computedStyle.lineHeight)
                if(isNaN(lineHeight)){
                    lineHeight = parseFloat(computedStyle.fontSize) * 1.2
                }
                const line = Math.floor(this.scrollHeight/lineHeight)
                if(line > (this as HTMLTextAreaElement).rows){
                    if(line >= 7) (this as HTMLTextAreaElement).rows = 7;
                    else (this as HTMLTextAreaElement).rows = line
                }
            })
        }
    })
    return ( 
        <div className="messenger-down-card-input">
 
            <img src={Camera} className='messenger-down-icon-left'/>
            <textarea rows={1}  id={`messenger-down-card-input-bar-${keys}`} className='messenger-down-card-input-bar' placeholder='Viết tin nhắn' />
            <img src={Send}  className='messenger-down-icon-right'  />
        </div>
     );
}
 
export default MessengerDownInput;