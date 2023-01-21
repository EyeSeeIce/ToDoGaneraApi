const express = require('express')
const userController = require('../controllers/user.controller')
const router = express.Router()

router.get('/get/:uuid', userController.getOne)
router.post('/create', userController.create)

module.exports = router
