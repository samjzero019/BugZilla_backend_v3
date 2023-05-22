const express = require("express");

const userController = require("../controllers/user");
const errorController = require("../controllers/error");
const isAuthMiddleware = require("../../../is_authenticated");

const router = express.Router();

/** Get All users Route */
router.get("/:id?", isAuthMiddleware, userController.getUsers);
/** Change Role Route */
router.put("/role/:id", isAuthMiddleware, userController.changeRole);

// handle Unregistered Routes
router.use(errorController.NotFound);

module.exports = router;
