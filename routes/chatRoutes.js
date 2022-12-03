const express = require('express')
const chatController = require('../controllers/chatController')
const { protect } = require('../controllers/authController')
const messageRouter = require('./messageRoutes')

const router = express.Router();

router.use('/:id/messages', messageRouter)

router.route('/').post(protect, chatController.accessChat)
router.route('/').get(protect, chatController.fetchChats)
router.route('/group').post(protect, chatController.creatGroupChat)


router.route('/:chatId/rename').patch(protect, chatController.renameGroup)
router.route('/:chatId/groupremove').patch(protect, chatController.removeFromGroup)
router.route('/:chatId/groupadd').patch(protect, chatController.addInGroup)

module.exports = router;

// Get all chats, access a chat, creat a group chat, rename group, remove from group, add in group
//  in chat room, there would be features for :-
// --> can create a contract,
// --> if contract is not made, then admin can add or remove anyone on his choice, anyone can leave on his 
// --> if contract is created, that room will be locked, now one can enter the room.
// --> if someone leaves, that means the contract is broken.
// --> A whole form will come for leaving a chat room.