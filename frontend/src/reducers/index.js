import { userLogin, userLogoutReducer } from "./users";
import { combineReducers } from "redux";

export default combineReducers({
    userDetails: userLogin,
    userLogout: userLogoutReducer});