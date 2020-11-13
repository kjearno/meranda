const express = require('express');
const authController = require('../../controllers/authController');
const postController = require('../../controllers/postController');

const router = express.Router();

router
  .route('/')
  .get(postController.getPosts)
  .post(
    authController.protect,
    postController.handlePhoto(),
    postController.createPost
  )
  .delete(authController.protect, postController.deletePosts);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(
    authController.protect,
    postController.handlePhoto(),
    postController.updatePost
  )
  .delete(authController.protect, postController.deletePost);

module.exports = router;
