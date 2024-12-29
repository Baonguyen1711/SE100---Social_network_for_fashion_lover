const express = require('express')
const router = express.Router()

const followController = require('../controllers/FollowController')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/create', followController.createFollow)
router.use('/ignore', followController.createIgnore)

// router.use('/recommendfollow', followController.recommendFollows)
router.get('/recommentfollow', followController.getNotFollows)
module.exports = router

//           mutualFriendArray.push({
//             userId: user.email,
//             avatar: user.avatar
//           });
//         }
//       }
//       notFollowed.push(mutualFriendArray);
//       res.json({
//         notFollowed: notFollowed,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }