import styled from "styled-components";

export const BasicButton = styled.button`
    height:7vh;
    width:50vh;
    border-radius:0.7vh;
    font-weight:bold;
    color:'blue';
    font-size:3vh;
    background-color: #0866ff;
    color:white;
    border:0px;
    cursor: pointer;
    
`
export const CreateButton = styled(BasicButton)`
    background-color:#42b72a;
    width:30vh;
    font-size:2.5vh;
    
    
`
export const CancelButton = styled(BasicButton)`
    background-color:#3b3d3e;
    width:30vh;
    font-size:2.5vh;
     &:hover {
        background-color: #555759; 
        
    }
    
`