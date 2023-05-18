const express = require('express')

const commentController = require('../controllers/comment')
const errorController = require('../controllers/error')
const router = express.Router()

/** CRUD */
router.post('/', commentController.createComment)
router.get('/:id?', commentController.getComments)
router.put('/:id', commentController.updateComment)
router.delete('/:id', commentController.deleteComment)

/** Handle Un-registered Routes */
router.use('/*',errorController.NotFound )

module.exports = router