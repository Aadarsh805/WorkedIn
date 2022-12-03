const Post = require('../models/postModel');
const Comment = require('../models/commentModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
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

exports.postComment = catchAsync(async (req,res) => {
    // post the comment
    const doc = await Comment.create(req.body);

    // add 1 to comments in Post Model
    if (doc) {
        const post = await Post.findById(req.body.post)
        const postComments = post.comments
        await Post.findByIdAndUpdate(req.body.post, {
            comments: postComments + 1
        }, {
            new: true,
            runValidators: true,
        })
    }

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
})

exports.updateComment = factory.updateOne(Comment)

exports.deleteComment = catchAsync(async (req,res) => {
    const doc = await Comment.findByIdAndDelete(req.params.id);

    if (doc) {
        const post = await Post.findById(req.body.post)
        // console.log("POST :- " + post);
        const postComments = post.comments
        // console.log("Comments:- " + postComments);
        await Post.findByIdAndUpdate(req.body.post, {
            comments: postComments - 1
        }, {
            new: true,
            runValidators: true,
        }) 
    } else {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
})