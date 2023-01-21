const express = require('express')
const authController = require('../controllers/auth.controller')
const router = express.Router()

router.post('/create/', authController.create)

router.post('/login/', authController.auth)

router.get('/check/', authController.check)


module.exports = router
