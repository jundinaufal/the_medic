const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/user', Controller.renderConsultation)
router.get('/doctor', Controller.renderConsultation)

module.exports = router