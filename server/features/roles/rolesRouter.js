const { Router } = require("express");
const rolesController = require("./rolesController");

const router = Router();

router.route("/").get(rolesController.getRoles);

module.exports = router;
