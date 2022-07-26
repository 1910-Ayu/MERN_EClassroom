const express = require('express');
const router = express.Router();
const classController = require('../controllers/class');
const protect = require('../middlewares/authMiddleware').protect;
router.post('/create', protect ,classController.createClass);
router.get('/fetch', protect , classController.fetchClasses);
router.get("/fetch/:classId", protect, classController.fetchClass);
router.post("/join", protect, classController.joinClass);
router.get("/fetch/users/:classId", protect, classController.fetchUsersInClass);

module.exports = router;