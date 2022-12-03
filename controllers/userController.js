const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const excludedFields = require('../utils/excludedFields')

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.searchUser = catchAsync(async (req,res,next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id }}).select('name photo');
  res.send(users);
})

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateProfile = factory.updateUser(excludedFields.excludeForProfile);
exports.updateAbout = factory.updateUser(excludedFields.excludeForAbout);
exports.updateSkills = factory.updateUser(excludedFields.excludeForSkills);

exports.deleteUsers = async (req,res) => {
  await User.deleteMany();

  res.send({
    status: 'success',
  })
}