const express = require('express');
const authController = require('../Controllers/authController')
const userController = require('../Controllers/userController')

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotpassword', authController.forgetPassword)
// router.post('/resetToken/:token', authController)

router.use(authController.protect)

router.get('/users', userController.getAllUsers)
router.get('/:id', userController.getUser)

//  getting users profile
router.get('/me', userController.getMe, userController.getUser)
router.patch('/me/profile', userController.updateProfile)
router.patch('/me/about', userController.getMe, userController.updateAbout)
router.patch('/me/skills', userController.updateSkills)

//  Updating own info



module.exports = router;

// --> SignUp, Login, Forgot Password, Reset Password, Get User Profile, 4

// 1) make Update user requests --> 3
