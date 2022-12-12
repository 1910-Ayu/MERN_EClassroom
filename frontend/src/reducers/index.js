
import { userLogin, userLogoutReducer } from "./users";
import {
    createClassReducer,
    fetchClassesReducer,
    fetchEnterClassDetailsReducer,
    fetchUsersInClassReducer,
    joinClassReducer,
  } from "./class";
import { combineReducers } from "redux";

export default combineReducers({
    userDetails: userLogin,
    userLogout: userLogoutReducer,
    classDetails: fetchClassesReducer,
    createClass: createClassReducer,
    joinClass: joinClassReducer,
    enterClassDetails: fetchEnterClassDetailsReducer,
    fetchUsersInClass: fetchUsersInClassReducer
});