const { Router } = require("express");
const multer = require("multer");
const { authController } = require("@features/auth");
const categoriesController = require("./categoriesController");

const router = Router();
const upload = multer();

router
  .route("/")
  .get(categoriesController.getCategories)
  .post(
    authController.protect,
    upload.none(),
    categoriesController.createCategory
  )
  .delete(authController.protect, categoriesController.deleteCategories);

router
  .route("/:id")
  .get(categoriesController.getCategory)
  .patch(
    authController.protect,
    upload.none(),
    categoriesController.updateCategory
  )
  .delete(authController.protect, categoriesController.deleteCategory);

module.exports = router;
