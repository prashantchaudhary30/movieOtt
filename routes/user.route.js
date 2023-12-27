const userController = require('../controllers/user.controller')
const express = require('express')
const userRoute = express.Router()

userRoute.post('/createUser', userController.registerUser)

module.exports = userRoute
