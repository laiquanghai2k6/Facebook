import React, { ButtonHTMLAttributes } from 'react';
import Close from '../../assets/close.png'

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLImageElement>{

}

const CloseButton:React.FC<CloseButtonProps> = ({...otherProps}) => {
    return ( 
        <img className="close-button" {...otherProps}
                        src={Close}
        />
     );
}
 
export default CloseButton;