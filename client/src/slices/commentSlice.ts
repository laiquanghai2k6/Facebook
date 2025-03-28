import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CommentType = {
    _id:string,
    type:string,
    image:string,
    text:string,
    userId:string,
    postId:string,
    createdAt:string,
    video:string,
    parentId:string,
}
type CommentList = {
    comments:Array<CommentType>
}
export const initialComment:CommentList = {
    comments:[]
}


export const commentSlice = createSlice({
    name:'comment',
    initialState:initialComment,
    reducers:{
        setComment:(state,action:PayloadAction<CommentType>)=>{
            state.comments = [action.payload,...state.comments]
        }
    }
})
export const {setComment} = commentSlice.actions

