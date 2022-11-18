const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");
const catchAsync = require('../Utils/catchAsync')

exports.allMessages = catchAsync(async (req,res) => {
    res.send('Hello') 
})

exports.sendMessage = catchAsync(async (req,res) => {
    res.send('SendMessage')
})
