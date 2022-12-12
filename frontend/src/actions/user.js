import axios from "axios";
import jwt_decode from "jwt-decode";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_REQUEST,
  } from "./actionTypes";

export const userLogin = (res)=>{
    return async(dispatch,getState)=>{
        dispatch({type:USER_LOGIN_REQUEST});
        try{
            const config = {
                method:"POST",
            }
            const userObject = jwt_decode(res.credential);
            if(userObject.email_verified){
                const {name,email,picture} = userObject;
               const data =await axios.post('/api/login',{name,email,picture},config);
               
               dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:data
               })
               localStorage.setItem("userDetails",JSON.stringify(getState().userDetails));
            }
        }catch(err){
            localStorage.removeItem("userDetails");
            dispatch({
                type:USER_LOGIN_FAIL,
                payload:err.response.data
            })

        }
    }
}

export const logoutUser = () => {
    return (dispatch) => {
      dispatch({
        type: USER_LOGOUT_REQUEST,
      });
      localStorage.removeItem("userDetails");
      window.location.reload();
    };
  };