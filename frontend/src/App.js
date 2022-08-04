

import {Routes,Route, Navigate} from "react-router-dom";

import {Home} from './pages/Home';
import Welcome from './pages/Welcome';
 function App() {
  return (
  
      
     <Routes>
      <Route path='/' element={<Navigate to='/welcome'/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/welcome' element={<Welcome/>}/>
      
     </Routes>
     
        
   
  )
}

export default App;
