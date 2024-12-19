const express = require('express')
const router = express.Router()

const exploreController = require('../controllers/ExploreController')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/post', exploreController.getAllPost)
router.use('/create', exploreController.create)

module.exports = router