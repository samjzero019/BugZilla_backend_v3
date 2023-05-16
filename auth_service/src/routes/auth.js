
const express  = require('express')

const authController = require('../controller/auth')
const errorController = require('../controller/error')

const router = express.Router()

/** Register Route */
router.post('/register', authController.register)
/** Login Route */
router.post('/login', authController.login)
/** Sign-out Route */
router.post('/logout', authController.logout)


// handle Unregistered Routes
router.use( errorController.NotFound);

module.exports = router