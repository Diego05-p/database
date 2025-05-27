const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controllers');

router.get('/', likeController.getAllLikes);
router.get('/:id', likeController.getLikeById);
router.post('/', likeController.createLike);
router.delete('/:id', likeController.deleteLike);

module.exports = router;
