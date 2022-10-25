const User = require("../Models/userModel");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const factory = require("./handlerFactory");

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id.valueOf();
  next();
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

exports.updateProfile = catchAsync(async (req, res, next) => {
  res.send("My prof");
});

exports.updateAbout = catchAsync(async (req, res, next) => {
  const userAbout = await User.findByIdAndUpdate(
    req.params.id,
    req.body.about,
    {
      new: true,
      runValidators: true
    });
    console.log("REQUEST :- " + req.body.about);
    console.log(userAbout);
    if (!userAbout) {
        return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            updatedUser: userAbout
        }
    })
});

// exports.updateAbout = factory.updateOne(User)

exports.updateSkills = catchAsync(async (req, res, next) => {
  res.send("My Skills");
});
