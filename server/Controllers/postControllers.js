const Post = require('../Models/postModel');
const catchAsync = require('./../Utils/catchAsync')
const AppError = require('../Utils/appError')

exports.getAllPosts = catchAsync(async (req,res,next) => {
    res.send('All Posts')
})

exports.creatPost = catchAsync(async (req,res,next) => {
    res.send('Post Cereated')
})