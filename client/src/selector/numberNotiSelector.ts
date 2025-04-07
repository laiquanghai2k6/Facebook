// import { createSelector } from "reselect";
// import { RootState } from "../store/store";


// const notiState = (state:RootState)=>state.notification.notification

// export const selectNumNoti = createSelector(
//     [notiState],
//     (noti)=>{
//         const num = noti.reduce((prev,current)=>{
//             if(current.type!='request'){
                
//                 return prev+1
//             }else return prev
//         },0)
//         return num
//     }

// )
