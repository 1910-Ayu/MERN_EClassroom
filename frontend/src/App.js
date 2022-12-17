import {Routes,Route, Navigate, useLocation} from "react-router-dom";

import Home from "./pages/Home";
import HeaderClass from "./components/UI/HeaderClass";
import HeaderHome from "./components/UI/HeaderHome";


import Welcome from './pages/Welcome';
import EnterClass from "./pages/EnterClass";
import Classwork from "./pages/Classwork";
import CreateMcq from "./pages/CreateMcq";
import CreateAssignment from "./pages/CreateAssignment";
import QuizScreen from "./pages/QuizScreen";
import AssignmentScreen from "./pages/AssignmentScreen";
import QuizResult from "./pages/QuizResult";
import QuizSubmissions from "./pages/QuizSubmissions";
import AssignmentSubmissions from "./pages/AssignmentSubmissions";
import ViewUserQuizSubmission from "./pages/ViewUserQuizSubmission";
import ViewUserAssignmentSubmission from "./pages/ViewUserAssignmentSubmission";
import ViewUsersScreen from "./pages/ViewUsersScreen";
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
      <Route path="/enter/class/:classId" element={<EnterClass />}/>
      <Route path="/enter/class/:classId/classwork" element={<Classwork/>}/>
      <Route
          path="/enter/class/:classId/classwork/create-mcq"
          exact
          strict
          element={<CreateMcq />}
        />
        <Route
          path="/enter/class/:classId/classwork/create-assignment"
          exact
          strict
          element={<CreateAssignment />}
        />
         <Route
          path="/enter/class/:classId/classwork/quiz/:quizId"
          exact
          element={<QuizScreen />}
        />
        <Route
          path="/enter/class/:classId/classwork/assignment/:assignmentId"
          exact
          element={<AssignmentScreen />}
        />
         <Route
          path="/enter/class/:classId/classwork/quiz/:quizId/results"
          exact
          element={<QuizResult />}
        />
        <Route
          path="/enter/class/:classId/classwork/quiz/:quizId/submissions"
          exact
          element={<QuizSubmissions/>}
        />
        <Route
          path="/enter/class/:classId/classwork/assignment/:assignmentId/submissions"
          exact
          element={<AssignmentSubmissions />}
        />
        <Route
          path="/enter/class/:classId/classwork/quiz/:quizId/submissions/:userId"
          exact
          element={<ViewUserQuizSubmission/>}
        />
        <Route
          path="/enter/class/:classId/classwork/assignment/:assignmentId/submissions/:userId"
          exact
          element={<ViewUserAssignmentSubmission />}
        />
        <Route
          path="/enter/class/:classId/people"
          exact
          element={<ViewUsersScreen />}
        />
     </Routes>
     </div>
        
   
  )
}

export default App;
