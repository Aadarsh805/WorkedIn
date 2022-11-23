const Contract = require("../Models/contractModel");
const User = require("../Models/userModel");
const catchAsync = require("../Utils/catchAsync");

exports.getAllContracts = catchAsync(async (req, res) => {
  const contracts = await Contract.find()
    .populate("lead", "name")
    .populate("team.member", "name")
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
    "team.approved": false,
  })
    .populate("lead", "name")
    .populate("team.member", "name")
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    userContract: contract,
  });
});

exports.initializeContract = catchAsync(async (req, res) => {
  // leader --> user
  // approved --> null

  const { team, startDate, dueDate } = req.body;
  const userId = req.user.id;

  const contract = await Contract.create({
    lead: userId,
    team,
    startDate,
    dueDate,
  });

  const fullContract = await Contract.find({ _id: contract._id })
    .populate("lead", "name")
    .populate("team.member", "name");

  res.status(201).json({
    status: "success",
    contract: fullContract,
  });
});

exports.acceptContract = catchAsync(async (req, res) => {
  //  just update that users approved entry
  //   take contract id
  // update the approved to true for that member

  const contract = await Contract.updateOne(
    {
      "team": { "$elemMatch": { "member": req.user.id } },
    },
    {
      "$set": {
        "team.$.approved": true,
      },
    }
  );

  console.log(contract);

  const updatedContract = await Contract.findById(req.params.contractId)
  .populate("lead", "name")
  .populate("team.member", "name");

  res.send(updatedContract);
});

exports.denyContract = (req, res) => {
  res.send("Deny Contract");
};

exports.updateContract = (req, res) => {
  res.send("Update Contract");
};
