import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useLocation,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Welcome from './pages/Welcome';


function App() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/welcome'/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      </Router>
      
    </div>
  )
}

export default App;