import {Routes,Route, Navigate, useLocation} from "react-router-dom";

import Home from "./pages/Home";
import HeaderClass from "./components/UI/HeaderClass";
import HeaderHome from "./components/UI/HeaderHome";


import Welcome from './pages/Welcome';
import EnterClass from "./pages/EnterClass";
 function App() {
   const location = useLocation();

  const onHomeScreen = location.pathname.startsWith("/home");
  const onClassScreen = location.pathname.startsWith("/enter");
  return (
   <div className="App">
   <>{onHomeScreen ? <HeaderHome /> : onClassScreen && <HeaderClass />}</>
     <Routes>
      <Route path='/' element={<Navigate to='/welcome'/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/welcome' element={<Welcome/>}/>
      <Route
          path="/enter/class/:classId" element={<EnterClass />}
        />
      
     </Routes>
     </div>
        
   
  )
}

export default App;
