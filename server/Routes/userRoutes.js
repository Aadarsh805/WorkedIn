const express = require('express');
const authController = require('../Controllers/authController')
const userController = require('../Controllers/userController')

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotpassword', authController.forgetPassword)
// router.post('/resetToken/:token', authController)

router.use(authController.protect)


router.get('/', userController.getAllUsers)
router.get('/me', userController.getMe, userController.getUser)
router.patch('/me/profile', userController.getMe, userController.updateProfile)
router.patch('/me/about', userController.getMe, userController.updateAbout)
router.patch('/me/skills', userController.getMe, userController.updateSkills)

router.get('/:id', userController.getUser)

module.exports = router;
