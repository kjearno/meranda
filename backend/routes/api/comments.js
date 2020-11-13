const express = require('express');
const multer = require('multer');
const authController = require('../../controllers/authController');
const commentController = require('../../controllers/commentController');

const router = express.Router();
const upload = multer();

// Additional
router.post('/me', authController.checkAuth, commentController.sendComment);

// CRUD
router
  .route('/')
  .get(commentController.getComments)
  .post(authController.protect, commentController.createComment)
  .delete(authController.protect, commentController.deleteComments);

router
  .route('/:id')
  .get(commentController.getComment)
  .patch(authController.protect, upload.none(), commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);

module.exports = router;
