const Chat = require("../models/chatModel");
const Contract = require("../models/contractModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

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

exports.getContract = catchAsync(async (req, res) => {
  // get userId
  // check if thers any contract with that userId
  // check approved
  // if false --> show
  // if true --> dont show

  // userid
  const userId = req.user.id;

  const contract = await Contract.find({
    "team.member": userId,
  })
    .populate("lead", "name photo")
    .populate("team.member", "name photo")
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    totalContracts: contract.length,
    userContract: contract,
  });
});

exports.initializeContract = catchAsync(async (req, res) => {
  // leader --> user
  // approved --> null

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
  //  just update that users approved entry
  //   take contract id and userid
  // update the approved --> true and denied --> false for that member

  console.log(req.user);
  const userId = req.user._id;

  const { chatId } = req.body;

  //   const contract = await Contract.updateOne(
  //     {
  //       "team": { $elemMatch: { "member": req.user.id } },
  //     },
  //     {
  //       $set: {
  //         "team.$.approved": true,
  //       },
  //     }
  //   );

  //   console.log(contract);

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
      status: 'fail',
      message: 'User has already approved the contract'
    })
  }
});

exports.denyContract = catchAsync(async (req, res) => {
  // find the contract and the member
  // look if he has approved the contract
  //  if true --> return
  //  if false --> then denied --> true

  // const contract = await Contract.findOne({ _id: req.params.contractId })
  //   .populate("lead", "name")
  //   .populate("team.member", "name");

  // console.log(contract);

  // check if the team member has

  // console.log(contract.team.member == req.user.id);

  // if (contract.team.member == req.user.id) {

  // }

  const deniedContract = await Contract.updateOne(
    {
      _id: req.params.contractId,
      "team.member": req.user.id,
    },
    {
      $set: {
        "team.$.denied": true,
        "team.$.approved": false,
      },
    }
  );

  console.log(deniedContract);

  const updatedContract = await Contract.findById(req.params.contractId)
    .populate("lead", "name")
    .populate("team.member", "name");

  res.send(updatedContract);
});

exports.updateContract = catchAsync(async (req, res) => {
  // if its a date, then update dueDate and push {} to prevDueDates
  // req.body  --> dueDate, reason

  const { newDueDate, reason } = req.body;
  const contractId = req.params.contractId;

  const contract = await Contract.findById(contractId);

  console.log(contract.dueDate);

  const newDueObj = {
    prevDate: contract.dueDate,
    delayReason: reason,
  };

  let newprevDueDatesArr = contract.prevDueDates;
  newprevDueDatesArr.push(newDueObj);

  const updatedContract = await Contract.findByIdAndUpdate(
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

  res.send(updatedContract);
});

// update --> dueDates, members role and responsibility

//  getRequest --> to indicate the members that have approved the contract
// then lead will declare the contract
// patch api --> chat --> contract --> true
