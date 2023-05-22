
const express  = require('express')

const userController = require('../controllers/user')
const errorController = require('../controllers/error')

const router = express.Router()

/** Get All users Route */
router.get('/:id?', userController.getUsers)
/** Change Role Route */
router.put('/role/:id', userController.changeRole)

// handle Unregistered Routes
router.use( errorController.NotFound);

module.exports = router