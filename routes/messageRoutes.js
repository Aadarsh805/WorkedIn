const express = require("express");
const messageController = require('../controllers/messageController')
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(authController.protect, messageController.allMessages)
    .post(authController.protect, messageController.sendMessage)

module.exports = router;