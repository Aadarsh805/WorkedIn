const Contract = require('../Models/contractModel');
const User = require('../Models/userModel');
const catchAsync = require('../Utils/catchAsync');

exports.getContract = catchAsync(async (req,res) => {
    // get userId
    // check if thers any contract with that userId
    // check approved
    // if false --> show
    // if true --> dont show

    // userid
    const userId = req.user.id;

    const contract = await Contract.find({
        "team.member": userId
    }).sort("-createdAt")

    res.status(200).json({
        status: 'success',
        userContract: contract
    })
})

exports.initializeContract = catchAsync(async (req,res) => {
    // leader --> user
    // approved --> null

    const { team, startDate, dueDate } = req.body;
    const userId = req.user.id;

    const contract = await Contract.create({
        lead: userId,
        team,
        startDate,
        dueDate
    })

    const fullContract = await Contract.find({ _id: contract._id })
        .populate("lead", "name")
        .populate("team.member", "name")

    res.status(201).json({
        status: 'success',
        contract: fullContract
    })
});

exports.acceptContract = (req,res) => {
    //  just update that users approved entry
    res.send('Accept Initialized')
}

exports.denyContract = (req,res) => {
    res.send('Deny Contract')
}

exports.updateContract = (req,res) => {
    res.send('Update Contract')
}