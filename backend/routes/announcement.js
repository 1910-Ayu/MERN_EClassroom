const express = require('express');
const router = express.Router();

const protect = require('../middlewares/authMiddleware').protect;

const announcementController = require('../controllers/announcement');

router.post('/create/:classId',protect,announcementController.createAnnouncement);

router.get('/fetch/:classId',protect,announcementController.fetchAnnouncements);

router.delete('/delete/:announcementId',protect,announcementController.deleteAnnouncement);

module.exports = router;