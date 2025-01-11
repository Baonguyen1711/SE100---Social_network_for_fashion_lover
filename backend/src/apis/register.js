const express = require('express')
const router = express.Router()

const registerController = require('../controllers/auth/RegisterController')
const { validate, checkDuplicate } = require('../middlewares/auth/register')
const dbMiddleware = require('../middlewares/dbConnection')

router.use(express.json())
router.post('/', registerController.create)

module.exports = router