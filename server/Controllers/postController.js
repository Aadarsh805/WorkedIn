const Post = require('../Models/postModel');
const catchAsync = require('../Utils/catchAsync')
const AppError = require('../Utils/appError')
const factory = require('./handlerFactory')


exports.setPostAuthor = (req,res,next) => {
    if (!req.body.author) req.body.author = req.user.id
    next();
}

exports.protectPost = catchAsync(async (req,res,next) => {
    //  We are getting postId from params
    const postId = req.params.id;

    // we'll get the author of that Post
    const authorData = await Post.findById(postId).select('author');
    console.log("AUTHOR :-" + authorData);

    //  if only userId and authorId are same, then proceed
    let userId = req.user._id.valueOf(); 
    let authorId = authorData.author._id.valueOf(); 
    if (userId === authorId) {
        next()
    } else {
        return next(new AppError("You dont have permission to change this post"))
    }
})

exports.reportPost = catchAsync(async (req,res,next) => {
    // check if post's author != user
    const postId = req.params.id;
    const authorData = await Post.findById(postId).select('author');

    let userId = req.user._id.valueOf(); 
    let authorId = authorData.author._id.valueOf(); 

    if (userId === authorId) {
        return next(new AppError("You cant report your own Post"))
    } else {
        res.send('Reported')
    }
})

exports.getAllPosts = factory.getAll(Post)
exports.createPost = factory.createOne(Post)
exports.getOnePost = factory.getOne(Post, {path: 'author'})
exports.updatePost = factory.updateOne(Post)
exports.deletePost = factory.deleteOne(Post)

// --> "Get All Posts", Get One Post, Crreate Post, Delete Post, Update Post, Report Post