const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.renderMedicine)
router.post('/', Controller.handleMedicine)

module.exports = router