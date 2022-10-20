const express = require('express');
const postControllers = require('../Controllers/postControllers')

const router = express.Router();

router.get('/', postControllers.getAllPosts)
router.post('/', postControllers.creatPost);

module.exports = router;

//  GetPost, CreatePost