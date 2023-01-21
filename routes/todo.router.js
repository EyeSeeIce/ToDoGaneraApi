const express = require('express')
const todoController = require('../controllers/todo.controller')
const authOnly = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/', [authOnly], todoController.create)
router.get('/', [authOnly], todoController.getAll)
router.patch('/:id', [authOnly], todoController.update)
router.patch('/complete/:id', [authOnly], todoController.complete)
router.delete('/:id', [authOnly], todoController.deleteTodo)

module.exports = router
