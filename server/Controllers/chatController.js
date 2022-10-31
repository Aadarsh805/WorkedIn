const Chat = require('../Models/chatModel')
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

exports.accessChat = catchAsync(async (req,res) => {
    res.send('Chat Initiated')
})

exports.fetchChats = catchAsync(async (req, res) => {
    res.send("All Chats")
})

exports.creatGroupChat = catchAsync(async (req,res) => {
    res.send("Group Chat Created")
})
exports.renameGroup = catchAsync(async (req,res) => {
    res.send("Group Chat Renamed")
})
exports.removeFromGroup = catchAsync(async (req,res) => {
    res.send("Removed from Group Chat")
})
exports.addInGroup = catchAsync(async (req,res) => {
    res.send("Added in Group Chat")
})