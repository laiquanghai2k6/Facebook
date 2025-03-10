import { PayloadAction } from './../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice } from "@reduxjs/toolkit";

export interface homeNavigateType{
    currentHome:string
}
const initialState:homeNavigateType={
    currentHome:'home'
}

export const homeNavigateSlice = createSlice({
    name:'homeNavigate',
    initialState,
    reducers:{
        navigateHome:(state,action:PayloadAction<string>)=>{
            state.currentHome = action.payload
        }
    }
})
export const {navigateHome} = homeNavigateSlice.actions


