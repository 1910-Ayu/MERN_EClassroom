import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function ColorSchemesExample() {

  const navigate = useNavigate();
  const responseGoogle = async(response) => {
    const userObject = jwt_decode(response.credential);
    if(userObject.email_verified){
       console.log(userObject);
       localStorage.setItem("userInfo",userObject.email);
    }
 }
 useEffect(()=>{
  if(localStorage.getItem("userInfo"))
    navigate('/home');
 },[navigate])
 
   const responseFailure=(result)=>{
    console.log(result);
   }
  return (
    <>
     
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">E-Classroom</Navbar.Brand>
          <Nav className="me-auto">
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
          onFailure={responseFailure}
          cookiePolicy="single_host_origin"
        />
     </GoogleOAuthProvider>
          </Nav>
        </Container>
      </Navbar>

     
    </>
  );
}

export default ColorSchemesExample;