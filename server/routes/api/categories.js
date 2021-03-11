const express = require("express");
const multer = require("multer");
const authController = require("../../controllers/authController");
const categoryController = require("../../controllers/categoryController");

const router = express.Router();
const upload = multer();

// Additional
router.get("/:category/posts/:post", categoryController.getPostFromCategory);
router.get("/:category/posts", categoryController.getPostsFromCategory);

// CRUD
router
  .route("/")
  .get(categoryController.getCategories)
  .post(
    authController.protect,
    upload.none(),
    categoryController.createCategory
  )
  .delete(authController.protect, categoryController.deleteCategories);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(
    authController.protect,
    upload.none(),
    categoryController.updateCategory
  )
  .delete(authController.protect, categoryController.deleteCategory);

module.exports = router;
