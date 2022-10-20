const express = require('express');
const postController = require('../Controllers/postControllers')
const authController = require('../Controllers/authControllers')

const router = express.Router();

router.get('/', postController.getAllPosts)
router.post('/', authController.protect ,postController.creatPost);

module.exports = router;

//  GetPost, CreatePost