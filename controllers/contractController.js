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

exports.getContract = catchAsync(async (req, res) => {
  const contractId = req.params.contractId;

  const contract = await Contract.findById(contractId)
    .populate("lead", "name photo")
    .populate("team.member", "name photo");

  // chek if contract is in-progress
  // if in-progress --> compare due date and current date and update to `delayed` if required

  const contractDueDate = contract.dueDate;
  console.log(contract.dueDate);

  let date = new Date();

  console.log(date);
  console.log(date >= contractDueDate);
  console.log(typeof date);
  console.log(typeof contractDueDate);

  if (contract.status === "in-progress") {
    if (contractDueDate <= date) {
      const updatedContract = await Contract.findByIdAndUpdate(contract.id, {
        status: "delayed",
      });

      res.status(200).json({
        status: "success",
        updatedContract,
      });
    }
  } else {
    res.status(200).json({
      status: "success",
      contract,
    });
  }
});

exports.initializeContract = catchAsync(async (req, res) => {
  const { team, startDate, dueDate, contractName, projectDescription, chatId } =
    req.body;
  const userId = req.user.id;

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

exports.finishContract = catchAsync(async (req,res) => {
  const { githubLink, liveLink, projectImages } = req.body;
  const contractId = req.params.contractId;

  if (!githubLink || !liveLink || !projectImages) {
    return next(new AppError('Provide sufficient details to finish the project'))
  }

  const finishedContract = await Contract.findByIdAndUpdate(contractId, {
    githubLink,
    liveLink,
    projectImages
  })

  res.status(200).json({
    status: 'success',
    finishedContract
  })
})

// contractId --> 

//  n members -- (n-1)*n

//  After Finishing review, contract will ask to revoiew the members