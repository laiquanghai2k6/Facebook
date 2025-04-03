import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface User {
    name:string,
    birth:string,
    gender:string,
    email: string,
    live: string,
    from: string,
    relationship: string,
    image: string
    friend: Array<String>,
    bio:string,
    _id:string,
    _v:string| null,
    backgroundImage:string,
    
}
interface UserState{
    getUser:User
}
export const initialUser:UserState = {
    getUser: {
        _id:"",
        gender:"",
        birth:"",
        name:"",
        email: "",
        live: "",
        from: "",
        relationship: "",
        image: "",
        friend: [],
        backgroundImage:"",
        _v:null,
        bio:"",
    }
}
export type UserLive ={
    birth:string,
    live:string,
    relationship:string,
    from:string,
    gender:string
}
export type UserInfo = {
    _id:string,
    name:string,
    image:string,
    backgroundImage:string,
    lastOnline?:number,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUser,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.getUser = action.payload
        },
        setUserImage:(state,action:PayloadAction<string>)=>{
            state.getUser.image = action.payload
        },
        setUserBackground:(state,action:PayloadAction<string>)=>{
            state.getUser.backgroundImage = action.payload
        },
        setUserBios:(state,action:PayloadAction<string>)=>{
            state.getUser.bio = action.payload
        },
        setUserLive:(state,action:PayloadAction<UserLive>)=>{
            const {birth,live,relationship,from,gender} = action.payload
            state.getUser.birth = birth
            state.getUser.live = live
            state.getUser.relationship = relationship
            state.getUser.from = from
            state.getUser.gender = gender

        }
    }
})
export const {setUser,setUserImage,setUserBackground,setUserBios,setUserLive} = userSlice.actions
