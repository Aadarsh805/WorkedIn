const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.accessChat = catchAsync(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return next(new AppError('UserId param not sent with request'))
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "name photo")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.status(200).json({
      status: 'success',
      chat: isChat[0]
    });
  } else {
    var chatData = {
      chatName: "one_On_one",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
    );

    res.status(200).json({
      status: 'success',
      chat: FullChat
    });
  }
});

exports.fetchChats = catchAsync(async (req, res) => {
  const allChats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users", "name photo")
    .populate("groupAdmin", "name photo")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  const populatedChats = await User.populate(allChats, {
    path: "latestMessage.sender",
    select: "name photo",
  });

  // console.log(populatedChats);

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

  if (users.length < 1) {
    return next(
      new AppError("Atleast 2 users are required to form a group chat")
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
  const { chatName, chatPhoto } = req.body;

  if ( !req.body.chatName && !req.body.chatPhoto ) {
    return next(new AppError('Neither new Chat Photo or Chat Name is provided'))
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId, 
    {
      chatName,
      chatPhoto
    }
    ,
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

exports.contractProtection = catchAsync(async (req,res,next) => {
  const chatId = req.params.chatId;

  const chat = await Chat.findById(chatId);
  // console.log(chat);
  const contractApproved = chat.contractApproved;
  const contractCompleted = chat.contractSuccessful;

  // console.log(contractApproved);
  // console.log(contractCompleted);

  if (contractApproved) {
    if (!contractCompleted) {
      return next(new AppError('Cannot change Group members after contract is created'))  
    }
  }

  next()
})

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

exports.finaliseContract = catchAsync(async (req,res) => {
  const chatId = req.params.chatId;

  const chat = await Chat.findByIdAndUpdate(chatId, {
    contractApproved: true
  })

  const contractId = chat.contractId;
  const contractMembers = chat.contractAprovedBy;

  contractMembers.forEach(async member => {
     await User.findByIdAndUpdate(member, {
      $push: { pastProjects: contractId },
     })
  });

  res.status(200).json({
    status: 'success',
    chat
  })
})
