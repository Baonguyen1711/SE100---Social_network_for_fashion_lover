const Story = require("../models/Story");
const User = require("../models/User");
const Follow = require("../models/Follow");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const cloudinary = require("cloudinary").v2;
mongoose.set("debug", true);

// Lấy tất cả stories
const getAllStories = async (req, res) => {
    try {
        const stories = await Story.find().populate('userId', 'name avatar'); // Có thể populate thông tin người dùng nếu cần
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stories", error });
    }
};


// Tạo mới story
const createStory = async (req, res) => {
    try {
        const { userId, mediaUrl } = req.body; // Lấy thông tin userId và mediaUrl từ body request

        if (!mediaUrl) {
            return res.status(400).json({ message: "mediaUrl is required!" });
        }

        const createdAt = new Date();
        const expiryTime = new Date(createdAt);
        expiryTime.setHours(createdAt.getHours() + 10); // Cộng thêm 10 giờ vào thời gian tạo

        const newStory = new Story({
            userId,
            mediaUrl,  // Lưu URL đã có sẵn từ frontend
            createdAt,
            updatedAt: new Date(),
            expiryTime, // Lưu thời gian hết hạn
        });

        await newStory.save();
        res.status(201).json({ message: "Story created successfully", story: newStory });
    } catch (error) {
        console.error("Error creating story:", error);
        res.status(500).json({ message: "Failed to create story", error: error.message || error });
    }
};

// Lấy stories của một người dùng theo userId
const getStoriesByUserId = async (req, res) => {
    try {
        const { userId } = req.query;
        const currentTime = new Date();

        const stories = await Story.find({
            userId,
            isDeleted: false,
            expiryTime: { $gte: currentTime } // Lọc chỉ các câu chuyện chưa hết hạn
        }).sort({ createdAt: -1 }); // Sort theo thời gian tạo, story mới nhất lên đầu

        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user's stories", error });
    }
};

// Xóa story theo ID
const deleteStoryById = async (req, res) => {
    try {
        const { storyId } = req.body; // Lấy storyId từ body request
        const deletedStory = await Story.findByIdAndDelete(storyId);
        if (deletedStory) {
            res.status(200).json({ message: "Story deleted successfully" });
        } else {
            res.status(404).json({ message: "Story not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete story", error });
    }
};

// Lấy story theo ID
const getStoryById = async (req, res) => {
    try {
        const { storyId } = req.query;
        const story = await Story.findById(storyId);
        if (story) {
            res.status(200).json(story);
        } else {
            res.status(404).json({ message: "Story not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching story", error });
    }
};

// Cập nhật story (mediaUrl hoặc các thuộc tính khác)
const updateStoryById = async (req, res) => {
    try {
        const { storyId, mediaUrl } = req.body; // Lấy thông tin storyId và mediaUrl từ body request
        const updatedStory = await Story.findByIdAndUpdate(
            storyId,
            { mediaUrl, updatedAt: new Date() }, // Cập nhật mediaUrl và thời gian cập nhật
            { new: true }
        );
        if (updatedStory) {
            res.status(200).json({ message: "Story updated successfully", story: updatedStory });
        } else {
            res.status(404).json({ message: "Story not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update story", error });
    }
};

const getStoriesByFollowingUsers = async (req, res) => {
    try {
        const { userId } = req.query;
        const currentTime = new Date();
        console.log("User ID:", userId);
        console.log("Current Time:", currentTime);

        // Kiểm tra danh sách người dùng theo dõi
        const followedUsers = await Follow.find(
            { followerId: new ObjectId(userId), isDelete: false },
            { followingId: 1, _id: 0 }
        ).lean();
        console.log("Followed Users:", followedUsers);

        const followedUserIds = followedUsers.map((follow) => follow.followingId);
        console.log("Followed User IDs:", followedUserIds);

        if (followedUserIds.length === 0) {
            return res.status(200).send({ stories: [] }); // Không có người theo dõi, trả về mảng rỗng
        }

        const user = await User.findById(userId, { avatar: 1 });
        console.log("User Info:", user);

        // Kiểm tra câu chuyện có tồn tại
        const storiesExist = await Story.find({ userId: { $in: followedUserIds } });
        console.log("Stories from followed users:", storiesExist);

        // Fetch câu chuyện gần nhất từ người theo dõi
        const followedUserStories = await Story.aggregate([
            {
                $match: {
                    userId: { $in: followedUserIds },
                    isDeleted: false,
                    expiryTime: { $gte: currentTime }, // Lọc những story chưa hết hạn
                },
            },
            { $sort: { createdAt: -1 } }, // Sắp xếp theo thời gian tạo, mới nhất trước
            {
                $group: {
                    _id: "$userId", // Group theo userId
                    latestStory: { $first: "$$ROOT" }, // Lấy câu chuyện mới nhất
                }
            },
            {
                $replaceRoot: { newRoot: "$latestStory" }, // Thay thế với câu chuyện mới nhất
            },
            {
                $lookup: {
                    from: "users", // Tham chiếu đến bảng Users
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo",
                },
            },
            { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } }, // Giải nén thông tin người dùng
            {
                $project: {
                    _id: 1,
                    content: 1,
                    images: 1,
                    mediaUrl: 1, // Bao gồm trường mediaUrl
                    expiryTime: 1, // Bao gồm trường expiryTime
                    createdAt: 1,
                    userId: 1,
                    "userInfo.firstname": 1,
                    "userInfo.lastname": 1,
                    "userInfo.avatar": 1,
                },
            },
        ]);
        console.log("Fetched Latest Stories from Followed Users:", followedUserStories);

        // Fetch câu chuyện gần nhất của chính người dùng
        const userStories = await Story.aggregate([
            {
                $match: {
                    userId: new ObjectId(userId),
                    isDeleted: false,
                    expiryTime: { $gte: currentTime }, // Lọc những story chưa hết hạn
                },
            },
            { $sort: { createdAt: -1 } }, // Sắp xếp theo thời gian tạo, mới nhất trước
            { $limit: 1 }, // Chỉ lấy câu chuyện gần nhất của người dùng
            {
                $lookup: {
                    from: "users", // Tham chiếu đến bảng Users
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo",
                },
            },
            { $unwind: { path: "$userInfo", preserveNullAndEmptyArrays: true } }, // Giải nén thông tin người dùng
            {
                $project: {
                    _id: 1,
                    content: 1,
                    images: 1,
                    mediaUrl: 1, // Bao gồm trường mediaUrl
                    expiryTime: 1, // Bao gồm trường expiryTime
                    createdAt: 1,
                    userId: 1,
                    isViewed: 1,
                    "userInfo.firstname": 1,
                    "userInfo.lastname": 1,
                    "userInfo.avatar": 1,
                },
            },
        ]);
        console.log("Fetched Latest Story from Current User:", userStories);

        // Kiểm tra xem câu chuyện của người dùng hiện tại đã có trong danh sách từ người theo dõi chưa
        const allStories = [...followedUserStories];

        // Nếu câu chuyện của người dùng hiện tại chưa có trong danh sách, thêm vào
        if (userStories.length > 0) {
            // Kiểm tra nếu câu chuyện của người dùng hiện tại chưa có trong allStories
            const userStoryAlreadyInFollowed = followedUserStories.some(story => story.userId.toString() === userStories[0].userId.toString());
            if (!userStoryAlreadyInFollowed) {
                allStories.push(userStories[0]);
            }
        }

        // Sắp xếp lại câu chuyện theo thời gian, câu chuyện mới nhất trước
        allStories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({ stories: allStories, user: user });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "Error fetching stories from followed users", error: e.message });
    }
};

const deleteExpiredStories = async () => {
    try {
        const currentTime = new Date();
        const result = await Story.updateMany(
            { expiryTime: { $lt: currentTime }, isDeleted: false },
            { $set: { isDeleted: true } }  // Đánh dấu câu chuyện là đã xóa
        );
        console.log(`${result.modifiedCount} stories have been deleted.`);
    } catch (error) {
        console.error("Error during automatic deletion", error);
    }
};

const updateIsViewed = async (req, res) => {
    try {
        const { storyId } = req.body;

        if (!storyId) {
            return res.status(400).json({ message: "storyId is required" });
        }

        // Tìm và cập nhật trạng thái isViewed
        const story = await Story.findByIdAndUpdate(
            storyId,
            { $set: { isViewed: true } },
            { new: true } // Trả về document sau khi cập nhật
        );

        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }

        res.status(200).json({
            message: "Story updated successfully",
            story,
        });
    } catch (error) {
        console.error("Error updating story:", error);
        res.status(500).json({ message: "Error updating story", error: error.message });
    }
};

module.exports = {
    getAllStories,
    createStory,
    getStoriesByUserId,
    deleteStoryById,
    getStoryById,
    updateStoryById,
    getStoriesByFollowingUsers,
    deleteExpiredStories,
    updateIsViewed
};
