import { createSelector } from "reselect";
import { RootState } from "../store/store";
const postState = (state:RootState)=>state.post.posts
