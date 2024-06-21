const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const consultationRouter = require('./consultation')
const medicineRouter = require('./medicine')
const registerRouter = require('./register')

router.get('/', Controller.renderHome)
router.get('/login', Controller.renderLogin)
router.post('/login', Controller.handleLogin)
router.get('/logout', Controller.readLogout)
router.use('/register', registerRouter)
router.get('/doctorList', Controller.readAllDoctors)

router.use(function (require, response, next) {
    console.log(`ini middleware`);
    next()
})
router.use('/consultations', consultationRouter)
router.use('/medicines', medicineRouter)

module.exports = router