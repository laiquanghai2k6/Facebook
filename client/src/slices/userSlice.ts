import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Post {
    image?: string,
    text?: string
}

export interface User {
    lastName: string,
    firstName:string,
    birth:string,
    gender:string,
    email: string,
    live: string,
    from: string,
    relationship: string,
    image: string
    friend: string,
    _id:string,
    _v:number| null,
    backgroundImage:string,
    post: Array<Post>
}
interface UserState{
    getUser:User
}
const initialValue:UserState = {
    getUser: {
        _id:"",
        gender:"",
        birth:"",
        lastName: "",
        firstName:"",
        email: "",
        live: "",
        from: "",
        relationship: "",
        image: "",
        friend: "",
        post: [],
        backgroundImage:"",
        _v:null
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialValue,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.getUser = action.payload
        },
        setUserImage:(state,action:PayloadAction<string>)=>{
            state.getUser.image = action.payload
        },
        setUserBackground:(state,action:PayloadAction<string>)=>{
            state.getUser.backgroundImage = action.payload
        }
    }
})
export const {setUser,setUserImage,setUserBackground} = userSlice.actions
