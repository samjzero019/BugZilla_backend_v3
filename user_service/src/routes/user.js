const express = require("express");

const userController = require("../controllers/user");
const errorController = require("../controllers/error");
// const isAuthMiddleware = require("../../../is_authenticated");
const is_auth = require("../middlewares/is_auth");

const router = express.Router();

/** Get All users Route */
router.get("/:id?", is_auth, userController.getUsers);
/** Change Role Route */
router.put("/role/:id", is_auth, userController.changeRole);

// handle Unregistered Routes
router.use(errorController.NotFound);

module.exports = router;
