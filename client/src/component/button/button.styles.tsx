import styled from "styled-components";

export const BasicButton = styled.button`
    height:3.5rem;
    width:25rem;
    border-radius:0.7vh;
    font-weight:bold;
    color:'blue';
    font-size:1.5rem;
    background-color: #0866ff;
    color:white;
    border:0px;
    cursor: pointer;
    &:hover{
    background-color:rgb(45, 126, 255);
    }
    @media (max-width: 870px) {
    width:90%;
    font-size: 1.5rem;
  }
    
`
export const CreateButton = styled(BasicButton)`
    background-color:#42b72a;
    width:15rem;
    font-size:1.25rem;
    
    
`
export const CancelButton = styled(BasicButton)`
    background-color:#3b3d3e;
    width:15rem;
    font-size:1.25rem;
     &:hover {
        background-color: #555759; 
        
    }
    
`