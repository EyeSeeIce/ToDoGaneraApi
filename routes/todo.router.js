import express from 'express'
import todoController from '../controllers/todo.controller'
import authOnly from '../middlewares/auth.middleware'
const router = express.Router()

router.post('/', [authOnly], todoController.create)
router.get('/', [authOnly], todoController.getAll)
router.patch('/:id', [authOnly], todoController.update)

export default router
