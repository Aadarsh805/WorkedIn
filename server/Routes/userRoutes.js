const express = require('express');
const authController = require('../Controllers/authController')

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotpassword', authController.forgetPassword)
// router.post('/resetToken/:token', authController)

router.use(authController.protect)

router.get('/me',authController.getMyProfile)
// router.post('/me/desc')
// router.post('/me/skills')

module.exports = router;

// --> SignUp, Login, Forgot Password, Reset Password, Get User Profile, 