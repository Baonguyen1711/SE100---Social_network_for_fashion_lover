const express = require("express");
const router = express.Router();

const storyController = require("../controllers/StoryController"); // Import controller xử lý logic story

// Middleware xử lý body
router.use(express.json());

// Route để lấy tất cả các story
router.use("/stories", storyController.getAllStories);

// Route để tạo mới story
router.use("/create", storyController.createStory);

// Route để lấy story của người dùng theo userId
router.use("/getstoriesbyuserid", storyController.getStoriesByUserId);

// Route để xóa story theo ID
router.use("/delete", storyController.deleteStoryById);

// Route để lấy stories của người dùng mà người dùng hiện tại đang theo dõi
router.use("/getstoriesbyfollowing", storyController.getStoriesByFollowingUsers);

// Route để lấy thông tin story theo ID
router.use("/getstorybystoryid", storyController.getStoryById);

// Route để cập nhật thông tin story (nếu có trường hợp cần cập nhật)
router.use("/updatestory", storyController.updateStoryById);

router.patch("/updateisviewed", storyController.updateIsViewed);

module.exports = router;
