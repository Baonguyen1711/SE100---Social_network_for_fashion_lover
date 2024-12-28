const express = require('express')
const router = express.Router()

const postController = require('../controllers/PostController')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/posts', postController.getAllPost)
router.use('/create', postController.create)
router.use('/api/v1/post/getposthome/:userId', postController.getPostsByFollowedUsers)

module.exports = router