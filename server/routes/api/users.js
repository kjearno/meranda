const express = require('express');
const authController = require('../../controllers/authController');
const userController = require('../../controllers/userController');

const router = express.Router();

// Additional
router
  .route('/me/photo')
  .patch(
    authController.checkAuth,
    userController.handlePhoto(),
    userController.updateUserPhoto
  );

router
  .route('/me/password')
  .patch(authController.checkAuth, userController.updateUserPassword);

// CRUD
router
  .route('/')
  .get(userController.getUsers)
  .post(authController.protect, userController.createUser)
  .delete(authController.protect, userController.deleteUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    authController.protect,
    userController.handlePhoto(),
    userController.updateUser
  )
  .delete(authController.protect, userController.deleteUser);

module.exports = router;
