const express = require('express')

const commentController = require('../controllers/comment')
const errorController = require('../controllers/error')
const isAuthMiddleware = require('../../../is_authenticated')
const router = express.Router()

/** CRUD */
router.post('/', isAuthMiddleware, commentController.createComment)
router.get('/:id?', isAuthMiddleware, commentController.getComments)
router.put('/:id', isAuthMiddleware, commentController.updateComment)
router.delete('/:id', isAuthMiddleware, commentController.deleteComment)

/** Handle Un-registered Routes */
router.use('/*',errorController.NotFound )

module.exports = router