const { Router } = require("express");
const { authController } = require("@features/auth");
const subscribersController = require("./subscribersController");

const router = Router();

router
  .route("/")
  .get(subscribersController.getSubscribers)
  .post(subscribersController.createSubscriber)
  .delete(authController.protect, subscribersController.deleteSubscribers);

router
  .route("/:id")
  .get(subscribersController.getSubscriber)
  .patch(authController.protect, subscribersController.updateSubscriber)
  .delete(authController.protect, subscribersController.deleteSubscriber);

module.exports = router;
