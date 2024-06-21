const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/doctor', Controller.renderRegisterDoctor)
router.post('/doctor', Controller.handleRegisterDoctor)
router.get('/user', Controller.renderRegisterUser)
router.post('/user', Controller.handleRegisterUser)


module.exports = router