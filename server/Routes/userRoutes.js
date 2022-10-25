const express = require('express');
const authController = require('../Controllers/authController')
const userController = require('../Controllers/userController')

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotpassword', authController.forgetPassword)
// router.post('/resetToken/:token', authController)

router.use(authController.protect)

//  getting users profile
router.get('/me', userController.getMyProfile)

//  Updating own info
router.get('/users', userController.getAllUsers)
router.patch('/me/about', userController.updateAbout)
router.patch('/me/skills', userController.updateSkills)
router.patch('/me/profile', userController.updateProfile)



module.exports = router;

// --> SignUp, Login, Forgot Password, Reset Password, Get User Profile, 4

// 1) make Update user requests --> 3
// 2) make get user request
// 3) make a getallusers request for dev
