
import { RootState } from "../store/store";
import { createSelector } from "reselect";

const selectUserState = (state:RootState) => state.user.getUser;



export const selectUserInfo =createSelector(
    [selectUserState],
    ({_id,name,image,backgroundImage,})=>({
        _id,
        name,image,backgroundImage
    })
)
export const selectUserProfileInfo = createSelector(
    [selectUserState],
    ({bio,birth,gender,from,live,relationship})=>({
        bio,birth,gender,from,live,relationship
    })
)