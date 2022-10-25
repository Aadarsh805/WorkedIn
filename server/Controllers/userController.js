const User = require("../Models/userModel");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const factory = require("./handlerFactory");
const excludedFields = require('../Utils/ExcludedFields')

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateProfile = factory.updateUser(excludedFields.excludeForProfile);
exports.updateAbout = factory.updateUser(excludedFields.excludeForAbout);
exports.updateSkills = factory.updateUser(excludedFields.excludeForSkills);

