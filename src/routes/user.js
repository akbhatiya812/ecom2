const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


router.get('/log-in',userController.getLogin);
router.post('/login', userController.postLogIn);
router.get('/log-out', userController.logout);
router.post('/signup',userController.postSignUp );

module.exports = router;
