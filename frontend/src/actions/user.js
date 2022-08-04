import axios from "axios";
import jwt_decode from "jwt-decode";

export const userLogin = (res)=>{
    return async(dispatch,getState)=>{
        dispatch({type:"USER_LOGIN_REQUEST"});
        try{
            const config = {
                method:"POST",
            }
            const userObject = jwt_decode(res.credential);
            if(userObject.email_verified){
                const {name,email,picture} = userObject;
               const data =await axios.post('/api/login',{name,email,picture},config);
               
               dispatch({
                type:"USER_LOGIN_SUCCESS",
                payload:data
               })
               localStorage.setItem("userDetails",JSON.stringify(data));
            }
        }catch(err){
            dispatch({
                type:"USER_LOGIN_FAIL",
                payload:err.response.data
            })

        }
    }
}