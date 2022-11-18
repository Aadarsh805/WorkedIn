const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");
const catchAsync = require('../Utils/catchAsync');
const AppError = require("../Utils/appError");

exports.allMessages = catchAsync(async (req,res) => {
    // console.log(req.params);
    const chatId = req.params.id
    const messages = await Message.find({ chat: chatId })
    .populate("sender", "name photo")
      .populate("chat");

    res.status(200).json({
        status: 'success',
        msgs: messages
    });
})

exports.sendMessage = catchAsync(async (req,res,next) => {
    const chatId = req.params.id;
    const content = req.body.chatMessage;
    
    if (!content || !chatId ) {
        return next(new AppError('Invalid data passed into request'))
    }

    var newMessage = {
        sender: req.user.id,
        content: content,
        chat: chatId,
    };

    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name photo");
    message = await message.populate("chat", "chatName");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json({
        status: 'success',
        msgs: message
    })
})
