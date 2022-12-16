const express = require('express')
const chatController = require('../controllers/chatController')
const { protect } = require('../controllers/authController')
const messageRouter = require('./messageRoutes')

const router = express.Router();

router.use('/:id/messages', messageRouter)

router.use(protect)

router.route('/').post(chatController.accessChat)
router.route('/').get(chatController.fetchChats)
router.route('/group').post(chatController.creatGroupChat)

router.route('/:chatId/finalisecontract').patch(chatController.finaliseContract)
router.route('/:chatId/rename').patch(chatController.renameGroup)

router.use(chatController.contractProtection)

router.route('/:chatId/groupremove').patch(chatController.removeFromGroup)
router.route('/:chatId/groupadd').patch(chatController.addInGroup)

module.exports = router;

// Get all chats, access a chat, creat a group chat, rename group, remove from group, add in group
//  in chat room, there would be features for :-
// --> can create a contract,
// --> if contract is not made, then admin can add or remove anyone on his choice, anyone can leave on his 
// --> if contract is created, that room will be locked, now one can enter the room.
// --> if someone leaves, that means the contract is broken.
// --> A whole form will come for leaving a chat room.