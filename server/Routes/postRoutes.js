const express = require('express');
const postController = require('../Controllers/postControllers')
const authController = require('../Controllers/authControllers')

const router = express.Router();

router
    .route('/')
    .get(postController.getAllPosts)
    .post(authController.protect, postController.setPostAuthor, postController.createPost);

router
    .route('/:id')
    .get(postController.getOnePost)
    .patch(authController.protect, postController.protectPost, postController.updatePost)
    .delete(authController.protect, postController.protectPost, postController.deletePost)
    .post(authController.protect, postController.reportPost)

module.exports = router;

//  GetPost, CreatePost, Get One Post, Update Post, Delete Post, Report Post