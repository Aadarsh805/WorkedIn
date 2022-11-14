const Chat = require("../Models/chatModel");
const User = require("../Models/userModel");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");

exports.accessChat = catchAsync(async (req, res) => {
  res.send("Chat Initiated");
});

exports.fetchChats = catchAsync(async (req, res) => {
  const allChats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "name")
    .populate("groupAdmin", "name")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  const populatedChats = await User.populate(allChats, {
    path: "latestMessage.sender",
    select: "name photo email",
  });

  console.log(populatedChats);

  res.status(200).send({
    status: 'success',
    totalChats: populatedChats.length,
    chats: populatedChats
  })
});

exports.creatGroupChat = catchAsync(async (req, res, next) => {
  if (!req.body.users || !req.body.chatName) {
    return next(new AppError("Please Fill all the feilds"));
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return next(
      new AppError("More than 2 users are required to form a group chat")
    );
  }

  users.push(req.user);

  const groupChat = await Chat.create({
    chatName: req.body.chatName,
    users: users,
    isGroupChat: true,
    groupAdmin: req.user,
  });

  const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json({
    status: "success",
    chatGroup: fullGroupChat,
  });
});

exports.renameGroup = catchAsync(async (req, res, next) => {
  const chatId = req.params.chatId;
  const { chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return next(new AppError("Chat not Found"));
  }

  res.send({
    status: "success",
    updatedGroupName: updatedChat,
  });
});

exports.removeFromGroup = catchAsync(async (req, res) => {
  const chatId = req.params.chatId;
  const { userId } = req.body;

  const removedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removedUser) {
    return next(new AppError("Chat not Found"));
  }

  res.send({
    status: "success",
    chatGroup: removedUser,
  });
});

exports.addInGroup = catchAsync(async (req, res) => {
  const chatId = req.params.chatId;
  const { userId } = req.body;

  //   check if user already exists in group or not
  //   if deosnt exist, move forwd
  //  if exists return

  // get Chat
  // search for userId in users
  const chat = await Chat.findById(chatId);
  const chatMembers = chat.users;

  const addedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  );
  // .populate("users", "-password")
  // .populate("groupAdmin", "-password");

  if (!addedUser) {
    return next(new AppError("Chat not Found"));
  }

  res.send({
    status: "success",
    chatGroup: addedUser,
  });
});
