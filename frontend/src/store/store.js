import {createStore, applyMiddleware,combineReducers} from "redux";
import thunk from "redux-thunk";
import { userLoginReducer } from "../reducers/users";


const reducer = combineReducers({
userDetails: userLoginReducer,
})

const userFromStorage = localStorage.getItem("userDetails")?
JSON.parse(localStorage.getItem("userDetails")):null;
const initialState = {
    userDetails : {userInfo: userFromStorage}
}

const middlewares = [thunk];
 export const store = createStore(
    reducer,
    initialState,
     applyMiddleware(...middlewares)
);