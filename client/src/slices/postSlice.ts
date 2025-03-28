import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type Likes = {
        like:number,
        userId:Array<string>
}
export type Wows={
    wow:number,
    userId:Array<string>
}
export type Hahas={
    haha:number,
    userId:Array<string>
}
export type Loves={
    love:number,
        userId:Array<string>
}
export type Sads={
    sad:number,
    userId:Array<string>
}
export type Angrys ={
    angry:number,
        userId:Array<string>
}
export type PostType = {
    createdAt:string,
    like:Likes
    wow:Wows
    haha:Hahas
    love:Loves
    sad:Sads
    angry:Angrys
    type:string,
    video:string,
    image:string,
    text:string,
    userId:string,
    _id:string,
}
export type PostShareType = {
    createdAt:string,
    like:Likes
    wow:Wows
    haha:Hahas
    love:Loves
    sad:Sads
    angry:Angrys
    type:string,
    video:string,
    image:string,
    text:string,
    textShare:string, //la cua nguoi share
    createdOrigin:string,
    userId:string,
    userIdShare:string,
    _id:string,
}
export type PostListState = {
    posts:Array<PostType | PostShareType>
}
export const initalPost:PostListState = {
    posts:[]

}


export const postSlice = createSlice({
    name:'post',
    initialState:initalPost,
    reducers:{
        setPost:(state,action:PayloadAction<PostType|PostShareType>)=>{
            state.posts.unshift(action.payload)
        }
    }

})
export const {setPost} = postSlice.actions