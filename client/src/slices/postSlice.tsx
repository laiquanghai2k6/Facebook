import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type Likes = {
   
}

export type PostType = {
    createdAt:string,
    like:{
        like:number,
        userId:Array<string>
    },
    wow:{
        wow:number,
        userId:Array<string>
    },
    haha:{
        haha:number,
        userId:Array<string>
    },
    love:{
        love:number,
        userId:Array<string>
    },
    sad:{
        sad:number,
        userId:Array<string>
    },
    angry:{
        angry:number,
        userId:Array<string>
    },
    type:string,
    video:string,
    image:string,
    text:string,
    userId:string,
    _id:string,
}
export type PostListState = {
    posts:Array<PostType>
}
export const initalPost:PostListState = {
    posts:[]

}


export const postSlice = createSlice({
    name:'post',
    initialState:initalPost,
    reducers:{
        setPost:(state,action:PayloadAction<PostType>)=>{
            state.posts.push(action.payload)
        }
    }

})
export const {setPost} = postSlice.actions