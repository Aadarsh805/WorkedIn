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
  //   take contract id and userid
  // update the approved --> true and denied --> false to true for that member

  console.log(req.user);

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

const contract = await Contract.updateOne({
    _id: req.params.contractId,
    'team.member': req.user.id
    }, {
    $set: {
        'team.$.approved': true
    }
})

console.log(contract);

  const updatedContract = await Contract.findById(req.params.contractId)
  .populate("lead", "name")
  .populate("team.member", "name");

  res.send({
    status: 'success',
  });
});


exports.denyContract = catchAsync(async (req, res) => {
    // find the contract and the member
    // look if he has approved the contract
    //  if true --> return
    //  if false --> then denied --> true

    const contract = await Contract.find({
        _id: req.params.contractId,
        'team.member': req.user.id,
        'team.approved': false
    })

    // console.log(contract);

    console.log(contract.team.member == req.user.id);

    // if (contract.team.member == req.user.id) {

    // }

    // const deniedContract = await Contract.updateOne({
    //     _id: req.params.contractId,
    //     'team.member': req.user.id
    //     }, {
    //     $set: {
    //         'team.$.denied': true
    //     }
    // })

  res.send(contract);
})

exports.updateContract = (req, res) => {
  res.send("Update Contract");
};

// update --> dueDates, members role and responsibility