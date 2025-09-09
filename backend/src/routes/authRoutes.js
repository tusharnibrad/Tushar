const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateUserRegistration } = require('../middlewares/validationMiddleware');

router.post('/register', validateUserRegistration, authController.registerUser); // to post the user registration data

router.post('/login', authController.loginUser); // to post the user login data 

router.post('/register-owner', authController.registerStoreOwner);

module.exports = router;