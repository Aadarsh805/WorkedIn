const express = require("express");
const messageController = require('../Controllers/messageController')
const authController = require('../Controllers/authController')

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(authController.protect, messageController.allMessages)
    .post(authController.protect, messageController.sendMessage)

module.exports = router;