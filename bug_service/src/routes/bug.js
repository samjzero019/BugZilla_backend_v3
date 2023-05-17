
const express = require('express')

const bugController = require('../controller/bug') 
const errorController = require('../controller/error')
const router = express.Router()

router.post('/', bugController.createBug)
router.get('/:id?', bugController.retrieveBugs)
router.put('/:id', bugController.updateBug)
router.delete('/:id', bugController.deleteBug)

router.put('/assign/:id', bugController.assignToUser)

// Un-registered Router handler
router.use("/*", errorController.NotFound);


module.exports = router


