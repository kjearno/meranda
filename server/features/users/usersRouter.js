const { Router } = require("express");
const { authController } = require("@features/auth");
const usersController = require("./usersController");

const router = Router();

// additional
router.patch(
  "/me/photo",
  authController.checkAuth,
  usersController.handlePhoto(),
  usersController.updateUserPhoto
);

router.patch(
  "/me/password",
  authController.checkAuth,
  usersController.updateUserPassword
);

router
  .route("/")
  .get(usersController.getUsers)
  .post(authController.protect, usersController.createUser)
  .delete(authController.protect, usersController.deleteUsers);

router
  .route("/:id")
  .get(usersController.getUser)
  .patch(
    authController.protect,
    usersController.handlePhoto(),
    usersController.updateUser
  )
  .delete(authController.protect, usersController.deleteUser);

module.exports = router;
