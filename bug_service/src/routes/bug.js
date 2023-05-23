const express = require("express");

const bugController = require("../controller/bug");
const errorController = require("../controller/error");
const isAuthMiddleware = require("../middlewares/is_auth");

const router = express.Router();

router.post("/", isAuthMiddleware, bugController.createBug);
router.get("/:id?", isAuthMiddleware, bugController.retrieveBugs); //TODO: need to separate routes
router.put("/:id", isAuthMiddleware, bugController.updateBug);
router.delete("/:id", isAuthMiddleware, bugController.deleteBug);

router.put("/assign/:id", isAuthMiddleware, bugController.assignToUser);

// Un-registered Router handler
router.use("/*", errorController.NotFound);

module.exports = router;
