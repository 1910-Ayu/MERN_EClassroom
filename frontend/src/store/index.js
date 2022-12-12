import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import reducers from '../reducers';




const initialLoginState = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : {
      isAuthenticated: false,
      loading: false,
      userInfo: null,
      error:null,
    };

const middlewares = [thunk];

 export const store = createStore(
    reducers,
    {
        userDetails:initialLoginState,
    }
    ,
     applyMiddleware(...middlewares)
);