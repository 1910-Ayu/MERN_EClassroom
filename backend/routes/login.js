const { loginUser } = require('../controllers/login');


const router = require('express').Router();

router.post('/',loginUser);

module.exports= router;