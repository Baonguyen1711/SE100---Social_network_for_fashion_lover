const express = require('express')
const router = express.Router()

const postController = require('../controllers/PostController')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')


router.use(express.json())
// router.use('/', loginController.get)
router.use('/posts', postController.getAllPost)
router.post('/create', postController.create)
router.use('/getpostsbyuserid', postController.getPostsByUserId)
router.get('/getposthome', postController.getPostsByFollowedUsers)
router.delete('/delete', postController.deletePostById)
router.get('/getpostbypostid', postController.getPostById)
router.use('/updatepost', postController.updateTitleAndContentAndImagesPostByPostId)

router.use('/favourited/getbyuserid', postController.getFavouritedPostsByUserId)
module.exports = router