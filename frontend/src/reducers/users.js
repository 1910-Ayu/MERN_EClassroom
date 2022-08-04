const logininitialstate = {
    isAuthenticated:false,
    loading:false,
    userInfo:null,
    error:null
};

export const userLoginReducer = (state = logininitialstate, action)=>{
    switch(action.type){
        case "USER_LOGIN_REQUEST":
            return {
                loading:true,
            }
        case "USER_LOGIN_SUCCESS":
            return{
                isAuthenticated:true,
                loading:false,
                userInfo: action.payload,
                
            }
        case "USER_LOGIN_FAIL":
            return {
                isAuthenticated:false,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
};