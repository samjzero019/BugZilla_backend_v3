const express = require("express");

const authController = require("../controllers/auth");
const errorController = require("../controllers/error");
const refreshTokenMiddleware = require("../middlewares/refresh");
const isLoggedIn = require("../middlewares/is_loggedIn");
const verifyAPI = require("../api/verify_jwt");
const router = express.Router();

/** Register Route */
router.post("/register", authController.register);
/** Login Route */
router.post("/login", authController.login);
/** Sign-out Route */
router.post("/logout", isLoggedIn, authController.logout);

/**  refresh token */
router.post("/refresh", isLoggedIn, refreshTokenMiddleware);

/** API Route */
router.post("/verify", verifyAPI);

// handle Unregistered Routes
router.use(errorController.NotFound);

module.exports = router;
