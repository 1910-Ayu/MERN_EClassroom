const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware').protect;

const taskController = require('../controllers/task');


router.post("/create", protect, taskController.createQuiz);
router.get("/fetch/all/:classId", protect, taskController.fetchTasks);
router.get("/fetch/:quizId", protect, taskController.fetchQuiz);
router.get(
  "/fetch/pending/:classId",
  protect,
  taskController.fetchPendingQuizzes
);
router.post("/submit", protect, taskController.submitQuiz);
router.get(
  "/submissions/:quizId",
  protect,
  taskController.fetchQuizSubmissions
);
router.get("/submission", protect, taskController.fetchUsersQuizSubmission);

module.exports = router;