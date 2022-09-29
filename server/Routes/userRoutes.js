const express = require('express');
const authController = require('../Controllers/authControllers')

router.post('/signup', authController.signup)
router.post('/login', authController.login)

module.exports = router;