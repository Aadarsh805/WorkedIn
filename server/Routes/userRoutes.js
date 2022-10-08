const express = require('express');
const authController = require('../Controllers/authControllers')

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.get('/me')
router.post('/me/desc')
router.post('/me/skills')

module.exports = router;