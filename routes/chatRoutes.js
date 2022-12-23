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
router.route('/:chatId/groupremove').patch(chatController.contractProtection,chatController.removeFromGroup)
router.route('/:chatId/groupadd').patch(chatController.contractProtection,chatController.addInGroup)

module.exports = router;