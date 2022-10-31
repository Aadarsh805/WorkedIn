const express = require('express')
const chatController = require('../Controllers/chatController')
const authController = require('../Controllers/authController')

const router = express.Router();

router.route('/').post(authController.protect, chatController.accessChat)
router.route('/').get(authController.protect, chatController.fetchChats)
router.route('/group').post(authController.protect, chatController.creatGroupChat)
router.route('/rename').patch(authController.protect, chatController.renameGroup)
router.route('/groupremove').patch(authController.protect, chatController.removeFromGroup)
router.route('/groupadd').patch(authController.protect, chatController.addInGroup)

module.exports = router;

// Get all chats, access a chat, creat a group chat, rename group, remove from group, add in group
//  in chat room, there would be features for :-
// --> can create a contract,
// --> if contract is not made, then admin can add or remove anyone on his choice, anyone can leave on his 
// --> if contract is created, that room will be locked, now one can enter the room.
// --> if someone leaves, that means the contract is broken.
// --> A whole form will come for leaving a chat room.