const express = require('express')
const router = express.Router()

const followController = require('../controllers/FollowController')
//const { validate, sanitizeInput } = require('../middlewares/login/validate')

router.use(express.json())
// router.use('/', loginController.get)
router.use('/create', followController.createFollow)
router.use('/ignore', followController.createIgnore)

// router.use('/recommendfollow', followController.recommendFollows)
router.use('/recommentfollow', followController.getNotFollows)
module.exports = router
// async getNotFollows(req, res) {
//     try {
//       connectToDb();
//       const { followerEmail } = req.query;
//       // Bước 1: Lấy danh sách những người mà người dùng đã follow (isDelete = false)
//       const following = await Follows.find({
//         followerId: followerEmail,
//         isDelete: false,
//       }).populate("followingId");
//       // Lấy danh sách người dùng đã follow (chỉ cần UserID)
//       const followingEmails = following.map((follow) => follow.email);
//       // Lấy danh sách những người mà user chưa follow (exclude người dùng hiện tại và những người đã follow)
//       const notFollowed = await User.find({
//         email: { $nin: [followerEmail, ...followingEmails] },
//       });
//       const mutualFriendArray =[]

//       for (const user of notFollowed) {
//         // Lấy danh sách những người mà user này follow
//         const mutualFriends = await Follows.find({
//           followerId: { $in: followingEmails },
//           followingId: user.email,
//           isDelete: false,
//         });

//         // Nếu có bạn chung, thêm vào danh sách đề xuất
//         if (mutualFriends > 0) {
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