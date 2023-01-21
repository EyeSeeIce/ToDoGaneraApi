import express from 'express'
import { userController } from '../controllers'
const router = express.Router()

router.get('/get/:uuid', userController.getOne)
router.post('/create', userController.create)

export default router
