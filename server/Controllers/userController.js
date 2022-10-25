const User = require("../Models/userModel");
const catchAsync = require("../Utils/catchAsync");
const factory = require('./handlerFactory')


exports.getMyProfile = catchAsync(async (req,res,next) => {
    const user = await User.findById(req.user._id);
    res.json({
      status: 'success',
      data: user
    })
})
  
  exports.updateProfile = catchAsync(async (req,res,next) => {
    res.send("My prof")
  })
  
  exports.updateSkills = catchAsync(async (req,res,next) => {
    res.send("My Skills")
  });

exports.updateAbout = (req,res) => {
    res.send('About Updated')
}

exports.getAllUsers = factory.getAll(User)