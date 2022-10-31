const express = require('express')
const chatController = require('../Controllers/chatController')
const authController = require('../Controllers/authController')

const router = express.Router();

router.route('/').post(authController.protect, chatController.accessChat)

module.exports = router;