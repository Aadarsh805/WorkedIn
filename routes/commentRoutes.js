const express = require("express");
const commentController = require("../controllers/commentController")
const authController = require('../controllers/authController')

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
