const { Router } = require("express");
const { authController } = require("@features/auth");
const postsController = require("./postsController");

const router = Router();

router
  .route("/")
  .get(postsController.getPosts)
  .post(
    authController.protect,
    postsController.handlePhoto(),
    postsController.createPost
  )
  .delete(authController.protect, postsController.deletePosts);

router
  .route("/:id")
  .get(postsController.getPost)
  .patch(
    authController.protect,
    postsController.handlePhoto(),
    postsController.updatePost
  )
  .delete(authController.protect, postsController.deletePost);

module.exports = router;
