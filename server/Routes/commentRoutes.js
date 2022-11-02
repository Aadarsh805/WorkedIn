const express = require("express");
const commentController = require("../Controllers/commentController")
const authController = require('../Controllers/authController')

const router = express.Router({ mergeParams: true });

router.use(authController.protect)

router
    .route('/')
    .get(commentController.getAllComments)
    .post(commentController.setPostandUserIds, commentController.postComment)

router
    .route('/:id')
    .post(commentController.reportComment)    
    .patch(commentController.protectComment, commentController.updateComment)
    .delete(commentController.setPostandUserIds, commentController.protectComment, commentController.deleteComment)

module.exports = router;
