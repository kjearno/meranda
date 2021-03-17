const { Router } = require("express");
const rolesController = require("./rolesController");

const router = Router();

router.get("/", rolesController.getRoles);
router.get("/:id", rolesController.getRole);

module.exports = router;
