import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type tokenState = {
    accessToken:string
}

const initialState:tokenState = {
    accessToken:''
}


export const tokenSlice = createSlice({
    name:'token',
    initialState,
    reducers:{
        setToken:(state,action:PayloadAction<string>)=>{
            state.accessToken = action.payload
        }   
    }
})

export const {setToken} = tokenSlice.actions