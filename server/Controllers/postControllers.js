const Post = require('../Models/postModel');
const catchAsync = require('./../Utils/catchAsync')
const AppError = require('../Utils/appError')
const factory = require('./handlerFactory')


exports.setPostAuthor = (req,res,next) => {
    if (!req.body.author) req.body.author = req.user.id
    next();
}

exports.protectPost = catchAsync(async (req,res,next) => {
    //  We are getting postId from params
    const postId = req.params.id;
    // console.log('POSTID :-' + postId);
    // we'll get the author of that Post
    const authorData = await Post.findById(postId).select('author');
    console.log("AUTHOR :-" + authorData);
    console.log("User ID :- " + req.user._id);
    console.log("Author ID :- " + authorData.author._id);
    console.log(typeof(req.user._id));
    console.log(typeof(authorData.author._id));
    //  if only userId and authorId are same, then proceed
    if (req.user._id === authorData.author._id) {
        console.log("APPROVED 😁");
    }
    next()
})

exports.getAllPosts = catchAsync(async (req,res,next) => {
    res.send('All Posts')
});

exports.createPost = factory.createOne(Post)
exports.getOnePost = factory.getOne(Post, {path: 'author'})
exports.updatePost = factory.updateOne(Post)
exports.deletePost = factory.deleteOne(Post)

// --> "Get All Posts", Get One Post, Crreate Post, Delete Post, Update Post