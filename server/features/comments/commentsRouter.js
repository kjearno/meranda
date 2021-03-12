const { Router } = require("express");
const multer = require("multer");
const { authController } = require("@features/auth");
const commentsController = require("./commentsController");

const router = Router();
const upload = multer();

// additional
router.post("/me", authController.checkAuth, commentsController.sendComment);

router
  .route("/")
  .get(commentsController.getComments)
  .post(authController.protect, commentsController.createComment)
  .delete(authController.protect, commentsController.deleteComments);

router
  .route("/:id")
  .get(commentsController.getComment)
  .patch(
    authController.protect,
    upload.none(),
    commentsController.updateComment
  )
  .delete(authController.protect, commentsController.deleteComment);

module.exports = router;
