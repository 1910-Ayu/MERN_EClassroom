import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import HomeScreenSVG from "../assets/svg/home_screen.svg";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../actions/user";
import {Link} from 'react-router-dom';



 function Welcome() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state)=> state.userDetails);
  const {isAuthenticated,loading,userInfo} = userDetails;
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/home');
    }
  },[isAuthenticated,navigate]);

 const responseGoogle= (res)=>{
  dispatch(userLogin(res));
 }

 
   
   const background = "white";
  return (
       <>
      <div className="relative w-full mx-auto bg-lightblue shadow-xl h-screen rounded p-4  bg-cover flex flex-row justify-between sm:w-full">
        <header
          className={`h-20 fixed left-0 top-0 bg-${background} shadow-lg flex w-screen items-center justify-between md:justify-between lg:justify-between xl:justify-between sm:flex-start  sm:h-24`}
          style={{
            transition: "background-color 200ms linear",
          }}
        >
          <div className="ml-8 flex flex-row items-center sm:flex-col sm:ml-4">
           
            <p
              className={`text-2xl font-bold ${
                background === "white" ? "text-black" : "text-white"
              } `}
              style={{
                fontFamily: ["Montserrat", "sans-serif"],
              }}
            >
              <Link to='/home'>
             E-Classroom</Link>
            </p>
          </div>
          <div
            className="px-4 flex justify-between"
            style={{
              fontStyle: ["Sen", "sans-serif"],
            }}
          >
           <GoogleOAuthProvider
     clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
       <GoogleLogin
          render={(renderProps) => (
            <button
              type="button"
              className=""
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <FcGoogle className="" /> Sign in with google
            </button>
          )}
          onSuccess={responseGoogle}
          cookiePolicy="single_host_origin"
        />
     </GoogleOAuthProvider>
          </div>
        </header>

        <div
          className="flex justify-between my-16 w-full items-center sm:flex-col"
          style={{
            fontFamily: ["Poppins", "sans-serif"],
          }}
        >
          <div>
            <div className="font-extrabold text-6xl my-2">
              Managing classrooms{" "}
            </div>
            <div className="font-extrabold text-6xl my-2">made easy with </div>
            <div className="text-blue font-extrabold text-6xl my-2">
              EClassroom
            </div>
          </div>
          <div className="w-1/2 sm:w-full">
            <img src={HomeScreenSVG} alt="" />
          </div>
        </div>
      </div>
        
    </>     
  );
}

export default Welcome;
