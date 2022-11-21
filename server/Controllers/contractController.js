const Contract = require('../Models/contractModel');
const User = require('../Models/userModel');
const catchAsync = require('../Utils/catchAsync');

exports.getContract = (req,res) => {
    // get userId
    // check if thers any contract with that userId
    // check approved
    // if false --> show
    // if true --> dont show
    res.send('jnni')
}

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

    res.status(201).json({
        status: 'success',
        contract: contract
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