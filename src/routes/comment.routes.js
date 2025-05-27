// src/routes/comment.routes.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controllers');

router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.get('/post/:postId', commentController.getCommentsByPost);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
