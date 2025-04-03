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
    children?:number
}
export type ReplyComment = {
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
export type UpdateChildren = {
    _id:string
}
type CommentList = {
    comments:Array<CommentType>,
    replyComment:Array<ReplyComment>

}
export const initialComment:CommentList = {
    comments:[],
    replyComment:[]
}


export const commentSlice = createSlice({
    name:'comment',
    initialState:initialComment,
    reducers:{
        setComment:(state,action:PayloadAction<CommentType>)=>{
            state.comments = [action.payload,...state.comments]
        },
        clearComment:(state)=>{
            state.comments = []
        },
        setReply:(state,action:PayloadAction<ReplyComment>)=>{
            state.replyComment = [...state.replyComment,action.payload]
        },
        updateChildren:(state,action:PayloadAction<string>)=>{
            const index = state.comments.findIndex((c)=>c._id == action.payload)
            if(index != -1){
                const temp = state.comments[index]
                if(!temp.children){
                    temp.children = 1
                }else{
                    temp.children +=1
                }
                state.comments[index] = temp
            }
        }   
    }
})
export const {updateChildren,setComment,clearComment,setReply} = commentSlice.actions

