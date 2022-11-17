const express = require("express");
const messageController = require('../Controllers/messageController')

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;