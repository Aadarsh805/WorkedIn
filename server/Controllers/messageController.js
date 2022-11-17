const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const catchAsync = require('../Utils/catchAsync')

const allMessages = catchAsync(async (req,res) => {
    res.send('Hello')
})

const sendMessage = catchAsync(async (req,res) => {
    res.send('SendMessage')
})
