const Chat = require("../models/chatModel");
const Contract = require("../models/contractModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError')

exports.getAllContracts = catchAsync(async (req, res) => {
  const contracts = await Contract.find()
    .populate("lead", "name photo")
    .populate("team.member", "name photo")
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    totalContracts: contracts.length,
    contracts,
  });
});


exports.getUserContracts = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const contracts = await Contract.find({
    "team.member": userId,
  })
    .populate("lead", "name photo")
    .populate("team.member", "name photo")
    .populate("chatId", "chatName")
    .sort("-createdAt");

  const date = new Date();

  // we get an array
  // iterate through every contract
  // if in-progress -> compare due date and current date and update to `delayed` if required

  contracts.forEach(async (contract) => {
    const contractDueDate = contract.dueDate;
    if (contract.status === "in-progress") {
      if (date >= contractDueDate) {
        let updatedContract = await Contract.findByIdAndUpdate(contract.id, {
          status: "delayed",
        });
        contract = updatedContract;
      }
    }
  });

  res.status(200).json({
    status: "success",
    totalContracts: contracts.length,
    userContracts: contracts,
  });
});


exports.getContract = catchAsync(async (req, res, next) => {
  const contractId = req.params.contractId;

  const contract = await Contract.findById(contractId)
    .populate("lead", "name photo")
    .populate("team.member", "name photo");

  // chek if contract is in-progress
  // if in-progress --> compare due date and current date and update to `delayed` if required

  if (!contract) {
    console.log('No contract');
    return next(new AppError('No contract on this ID exist'))
  }

  const contractDueDate = contract.dueDate;

  console.log(contract.dueDate);

  let date = new Date();

  console.log(date);
  console.log(date >= contractDueDate);
  // console.log(typeof date);
  // console.log(typeof contractDueDate);

  if (contract.status === "in-progress") {

    if (contractDueDate <= date) {
      contract = await Contract.findByIdAndUpdate(contract.id, {
        status: "delayed",
      });
    }

    res.status(200).json({
      status: "success",
      contract,
    });

  } else {
    res.status(200).json({
      status: "success",
      contract,
    });
  }
});


exports.initializeContract = catchAsync(async (req, res, next) => {
  const { team, startDate, dueDate, contractName, projectDescription, chatId } =
    req.body;
  const userId = req.user.id;

  const chat = await Chat.findById(chatId);

  if (chat.contractId) {
    return next(new AppError('Multiple Contracts cant be initialized from one group chat'))
  }

  const contract = await Contract.create({
    contractName,
    projectDescription,
    lead: userId,
    team,
    startDate,
    dueDate,
    chatId,
  });

  let contract2;
  let updatedChat;

  if (contract) {
    contract2 = await Contract.updateOne(
      {
        _id: contract._id,
        "team.member": req.user.id,
      },
      {
        $set: {
          "team.$.approved": true,
        },
      }
    );

    updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        contracted: true,
        contractId: contract._id,
        $push: { contractAprovedBy: userId },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  const fullContract = await Contract.find({ _id: contract._id })
    .populate("lead", "name")
    .populate("team.member", "name");

  res.status(201).json({
    status: "success",
    contract2,
    updatedChat,
    contract: fullContract,
  });
});


exports.acceptContract = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const { chatId } = req.body;

  const chat = await Chat.findById(chatId);
  const approvedArr = chat.contractAprovedBy;

  if (!approvedArr.includes(userId)) {
    const contract = await Contract.updateOne(
      {
        _id: req.params.contractId,
        "team.member": req.user.id,
      },
      {
        $set: {
          "team.$.approved": true,
          "team.$.denied": false,
        },
      }
    );

    console.log(contract);

    const updatedContract = await Contract.findById(req.params.contractId)
      .populate("lead", "name")
      .populate("team.member", "name");

    let updatedChat;

    if (contract) {
      updatedChat = await Chat.findByIdAndUpdate(
        updatedContract.chatId,
        {
          $push: { contractAprovedBy: userId },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.send({
      status: "success",
      updatedChat,
      updatedContract,
    });
  } else {
    res.status(403).json({
      status: "fail",
      message: "User has already approved the contract",
    });
  }
});


exports.denyContract = catchAsync(async (req, res) => {
  const contractId = req.params.contractId;
  const userId = req.user.id;

  const deniedContract = await Contract.updateOne(
    {
      _id: contractId,
      "team.member": userId,
    },
    {
      $set: {
        "team.$.denied": true,
        "team.$.approved": false,
      },
    }
  );

  console.log(deniedContract);

  const updatedContract = await Contract.findById(contractId)
    .populate("lead", "name")
    .populate("team.member", "name");

  res.send(updatedContract);
});


exports.updateDueContract = catchAsync(async (req, res, next) => {
  const { newDueDate, reason } = req.body;
  const contractId = req.params.contractId;
  
  const contract = await Contract.findById(contractId);
    

  let date = new Date();

  console.log(Date.parse(newDueDate) > Date.parse(date));
  
  const parsedNewDueDate = Date.parse(newDueDate);
  const parsedCurrentDate = Date.parse(date)
  const parsedStartingDate = Date.parse(contract.startDate)
  const parsedDueDate = Date.parse(contract.dueDate)

  console.log(parsedDueDate);
  console.log(parsedNewDueDate);
  
  // check if prevDueDate and newDueDate arent similar
  if (parsedNewDueDate === parsedDueDate) {
    return next(new AppError("Enter a new Due Date"));
  }

  if (parsedNewDueDate < parsedCurrentDate || parsedNewDueDate < parsedStartingDate) {
    return next(new AppError("Enter a logical new Due Date 🙄"));
  }


  const newDueObj = {
    prevDate: contract.dueDate,
    delayReason: reason,
  };

  let newprevDueDatesArr = contract.prevDueDates;
  newprevDueDatesArr.push(newDueObj);

  let updatedContract;

  if (contract.status === "delayed") {
    updatedContract = await Contract.findByIdAndUpdate(
      contractId,
      {
        dueDate: newDueDate,
        prevDueDates: newprevDueDatesArr,
        status: "in-progress",
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    updatedContract = await Contract.findByIdAndUpdate(
      contractId,
      {
        dueDate: newDueDate,
        prevDueDates: newprevDueDatesArr,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  res.status(200).json({
    status: "success",
    updatedContract,
  });
});

exports.initialiseFinishContract = catchAsync(async (req,res,next) => {
  const { githubLink, liveLink, projectImages } = req.body;
  const contractId = req.params.contractId;

  if (!githubLink || !projectImages) {
    return next(new AppError('Provide sufficient details to finish the project'))
  }

  const contract = await Contract.findById(contractId)

  if (req.user.id !== contract.lead.id) {
    return next(new AppError('Only the Contract lead the initialise to finish contract'))
  }

  const chatId = contract.chatId;
  const chat = await Chat.findById(chatId);

  if(!chat.contractApproved){
    return next(new AppError('The contract isnt approved by members'))
  }

  const finishedContract = await Contract.findByIdAndUpdate(contractId, {
    githubLink,
    liveLink,
    projectImages,
    finishContractInitiated: true,
  });
  
  const updatedChat = await Chat.findByIdAndUpdate(chatId, {
    $push: { contractFinishedApprovedBy: req.user.id }
  })

  res.status(200).json({
    status: 'success',
    updatedChat,
    finishedContract
  })
});


exports.acceptFinishContract = catchAsync(async (req,res,next) => {

  const contractId = req.params.contractId;
  
  const contract = await contract.findById(contractId);
  const finishApprovalArr = contract.finishedApprovedBy;

  console.log(finishApprovalArr.find(user => user === req.user.id));

  if (finishApprovalArr.find(user => user === req.user.id)) {
    return next(new AppError('User has already approved the contract finish!!'))
  }

  const chatId = contract.chatId;

  const updatedChat = await Chat.findByIdAndUpdate(chatId, {
    $push: { contractFinishedApprovedBy: req.user.id }
  })

  res.status(200).json({
    status: 'success',
    updatedChat
  })

})

exports.finishContract = catchAsync(async (req,res) => {
  const contractId = req.params.contractId;

  // check if every contract user has approved approval
  // if true --> 
  // update -->
  // chat --> contractSuccessful --> true 
  // contract --> status --> success

  const contract = await Contract.findById(contractId)

  if (req.user.id !== contract.lead.id) {
    return next(new AppError('Only the Contract lead can finish contract'))
  }

  if (contract.team.length !== contract.finishedApprovedBy.length) {
    return next(new AppError('Everyone hasnt approved the contract finish yet!!'))
  }

  const chatId = contract.chatId;

  const updateChat = await Chat.findByIdAndUpdate(chatId, {
    contractSuccessful: true
  })

  const updatedContract = await Contract.findByIdAndUpdate(contractId, {
    status: 'completed'
  })

  res.status(200).json({
    status: 'success',
    updateChat,
    updatedContract
  })
})

// exports.leaveContract = await catchAsync(async (req,res) => {
// get info --> why leaving (reason) | what you didnt liked in the group | 
// update contract status --> broken
// 
// })

// exports.denyFinishContract = catchAsync(async (req,res) => {
// // feature to be added in future
// })

// contractId --> 

//  n members -- (n-1)*n

//  After Finishing review, contract will ask to revoiew the members