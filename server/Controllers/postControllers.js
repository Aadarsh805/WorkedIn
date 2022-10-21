const Post = require('../Models/postModel');
const catchAsync = require('./../Utils/catchAsync')
const AppError = require('../Utils/appError')
const factory = require('./handlerFactory')


exports.setPostAuthor = (req,res,next) => {
    if (!req.body.author) req.body.author = req.user.id
    next();
}

exports.protectPost = catchAsync(async (req,res,next) => {
    console.log(req.user._id.valueOf());
    //  We are getting postId from params
    const postId = req.params.id;

    // we'll get the author of that Post
    const authorData = await Post.findById(postId).select('author');
    console.log("AUTHOR :-" + authorData);

    //  if only userId and authorId are same, then proceed
    let userId = req.user._id.valueOf(); 
    let authorId = authorData.author._id.valueOf(); 
    if (userId === authorId) {
        console.log("APPROVED 😁");
        next()
    } else {
        return next(new AppError("You dont have permission to change this post"))
    }
})

exports.getAllPosts = catchAsync(async (req,res,next) => {
    res.send('All Posts')
});

exports.createPost = factory.createOne(Post)
exports.getOnePost = factory.getOne(Post, {path: 'author'})
exports.updatePost = factory.updateOne(Post)
exports.deletePost = factory.deleteOne(Post)

// --> "Get All Posts", Get One Post, Crreate Post, Delete Post, Update Post