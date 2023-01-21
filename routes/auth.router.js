import express from 'express'
import authController from '../controllers/auth.controller'
const router = express.Router()

router.post('/create/', authController.create)

router.post('/login/', authController.auth)

router.get('/check/', authController.check)

export default router
