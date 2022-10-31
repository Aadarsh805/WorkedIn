const Chat = require('../Models/chatModel')
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

exports.accessChat = catchAsync(async (req,res) => {
    res.send('Chat Initiated')
})