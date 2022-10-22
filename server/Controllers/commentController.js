const Post = require('../Models/postModel');
const Comment = require('../Models/commentModel')
const catchAsync = require('../Utils/catchAsync')
const AppError = require('../Utils/appError')
const factory = require('./handlerFactory')

exports.setPostandUserIds = (req,res,next) => {
    if (!req.body.user) req.body.user = req.user._id
    if (!req.body.post) req.body.post = req.params.postId
    next();
}

exports.protectComment = catchAsync(async (req,res,next) => {
    //  get commentId
    const commentId = req.params.id

    // check author of comment id
    const authorData = await Comment.findById(commentId).select('user');
    const userId = req.user._id.valueOf();
    const commentUserId = authorData.user._id.valueOf();
    // we'll see if author === user

    if (userId === commentUserId) {
        next()
    } else {
        return next(new AppError('Comment cant be modified'))
    }
})

exports.reportComment = catchAsync(async (req,res,next) => {
    const commentId = req.params.id

    const authorData = await Comment.findById(commentId).select('user');
    const userId = req.user._id.valueOf();
    const commentUserId = authorData.user._id.valueOf();

    if (userId === commentUserId) {
        return next(new AppError('Cannot report your own comment'))
    } else {
        res.send('Reported')
    }
})

exports.getAllComments = factory.getAll(Comment)
exports.postComment = factory.createOne(Comment)
exports.updateComment = factory.updateOne(Comment)
exports.deleteComment = factory.deleteOne(Comment)