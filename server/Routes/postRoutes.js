const express = require('express');
const postController = require('../Controllers/postController')
const authController = require('../Controllers/authController')
const commentRouter = require('./commentRoutes')

const router = express.Router();

router.use('/:postId/comment', commentRouter)

router
    .route('/')
    .get(postController.getAllPosts)
    .post(authController.protect, postController.setPostAuthor, postController.createPost);

router
    .route('/:id')
    .get(postController.getOnePost)
    .post(authController.protect, postController.reportPost)
    .patch(authController.protect, postController.likePost)
    .patch(authController.protect, postController.protectPost, postController.updatePost)
    .delete(authController.protect, postController.protectPost, postController.deletePost)
    
// router.patch('/:id/like').patch(authController.protect, postController.likePost)


module.exports = router;

//  GetPost, CreatePost, Get One Post, Update Post, Delete Post, Report Post

//  Like Post