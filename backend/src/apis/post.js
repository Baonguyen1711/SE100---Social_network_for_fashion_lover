const express = require('express')
const router = express.Router()

const postController = require('../controllers/PostController')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/posts', postController.getAllPost)
router.post('/create', postController.create)
router.get('/getposthome', postController.getPostsByFollowedUsers)
router.delete('/delete', postController.deletePostById)

module.exports = router