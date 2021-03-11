const express = require("express");
const authController = require("../../controllers/authController");
const subscriberController = require("../../controllers/subscriberController");

const router = express.Router();

router
  .route("/")
  .get(subscriberController.getSubscribers)
  .post(subscriberController.createSubscriber)
  .delete(authController.protect, subscriberController.deleteSubscribers);

router
  .route("/:id")
  .get(subscriberController.getSubscriber)
  .patch(authController.protect, subscriberController.updateSubscriber)
  .delete(authController.protect, subscriberController.deleteSubscriber);

module.exports = router;
