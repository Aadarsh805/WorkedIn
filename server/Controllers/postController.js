const Post = require("../Models/postModel");
const catchAsync = require("../Utils/catchAsync");
const AppError = require("../Utils/appError");
const factory = require("./handlerFactory");

exports.setPostAuthor = (req, res, next) => {
  if (!req.body.author) req.body.author = req.user.id;
  next();
};

exports.protectPost = catchAsync(async (req, res, next) => {
  //  We are getting postId from params
  const postId = req.params.id;

  // we'll get the author of that Post
  const authorData = await Post.findById(postId).select("author");
  console.log("AUTHOR :-" + authorData);

  //  if only userId and authorId are same, then proceed
  let userId = req.user._id.valueOf();
  let authorId = authorData.author._id.valueOf();
  if (userId === authorId) {
    next();
  } else {
    return next(new AppError("You dont have permission to change this post"));
  }
});

exports.reportPost = catchAsync(async (req, res, next) => {
  // check if post's author != user
  const postId = req.params.id;
  const authorData = await Post.findById(postId).select("author");

  let userId = req.user._id.valueOf();
  let authorId = authorData.author._id.valueOf();

  if (userId === authorId) {
    return next(new AppError("You cant report your own Post"));
  } else {
    res.send("Reported");
  }
});

exports.getAllPosts = factory.getAll(Post);
exports.createPost = factory.createOne(Post);
exports.getOnePost = factory.getOne(Post, { path: "author" });
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);

exports.likePost = catchAsync(async (req, res, next) => {
  // get post Id
  const postId = req.params.id;

  //  get users id
  const userId = req.user.id;
  
  //  check if userId is in likes []
  // --> get post
  const post = await Post.findById(postId).select("like");
  const likeArr = post.like;
  console.log(post.like);
  console.log(typeof(post.like));
  // check
  if (likeArr.includes(userId)) {
    likeArr = likeArr.filter(function(value,index,arr){
        return value != userId
    })
    res.send(likeArr)
  } else {
    likeArr.push(userId);
    // const likedPost = await Post.findByIdAndUpdate(postId, likeArr, {
    //   new: true,
    //   runValidators: true,
    // });
    res.send({
        status: "success",
        likeArr
    });
  }
  // if true -> remove; if false -> add
});
// --> "Get All Posts", Get One Post, Crreate Post, Delete Post, Update Post, Report Post
