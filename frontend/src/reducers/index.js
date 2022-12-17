
import { userLogin, userLogoutReducer } from "./users";
import {
    createClassReducer,
    fetchClassesReducer,
    fetchEnterClassDetailsReducer,
    fetchUsersInClassReducer,
    joinClassReducer,
  } from "./class";
  import {
    createAssignmentReducer,
    createAssignmentSubmissionReducer,
    createQuizReducer,
    downloadAssignmentReducer,
    downloadAssignmentSubmissionReducer,
    fetchAssignmentReducer,
    fetchAssignmentsReducer,
    fetchAssignmentSubmissionsReducer,
    fetchPendingTasksReducer,
    fetchQuizReducer,
    fetchQuizSubmissionsReducer,
    fetchUsersAssignmentSubmissionReducer,
    fetchUsersQuizSubmissionReducer,
    gradeAssignmentReducer,
    submitQuizReducer,
  } from "./assignment";
  import {
    createNewAnnouncementReducer,
    deleteAnnouncementReducer,
    fetchAnnouncementsReducer,
  } from "./announcement";
import { combineReducers } from "redux";

export default combineReducers({
  userDetails: userLogin,
  userLogout: userLogoutReducer,
  classDetails: fetchClassesReducer,
  createClass: createClassReducer,
  joinClass: joinClassReducer,
  fetchAnnouncements: fetchAnnouncementsReducer,
  createNewAnnouncement: createNewAnnouncementReducer,
  deleteAnnouncement: deleteAnnouncementReducer,
  //nn
  assignmentDetails: fetchAssignmentsReducer,
  enterClassDetails: fetchEnterClassDetailsReducer,
  createQuiz: createQuizReducer,
  createAssignment: createAssignmentReducer,
  fetchQuiz: fetchQuizReducer,
  //nn
  fetchAssignment: fetchAssignmentReducer,
  fetchPendingTasks: fetchPendingTasksReducer,
  submitQuiz: submitQuizReducer,
  fetchQuizSubmissions: fetchQuizSubmissionsReducer,
  fetchAssignmentSubmissions: fetchAssignmentSubmissionsReducer,
  fetchUsersQuizSubmission: fetchUsersQuizSubmissionReducer,
  fetchUsersAssignmentSubmission: fetchUsersAssignmentSubmissionReducer,
  uploadAssignmentSubmission: createAssignmentSubmissionReducer,
  downloadAssignment: downloadAssignmentReducer,
  downloadAssignmentSubmission: downloadAssignmentSubmissionReducer,
  gradeAssignment: gradeAssignmentReducer,
  fetchUsersInClass: fetchUsersInClassReducer,
});