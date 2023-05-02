const express = require('express')

const {
    userLogin,
    userSignup
} = require('../controllers/userController.js')

const router = express.Router()

// login route
router.post('/login', userLogin);

// register route
router.post('/signup', userSignup);

module.exports = router