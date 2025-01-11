const mongoose = require("mongoose");

mongoose.set("debug", true);

const FashionSocial = mongoose.connection.useDb("FashionSocial");

const StorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    mediaUrl: [{ type: String }],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    expiryTime: {
        type: Date,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isViewed: {
        type: Boolean,
        default: false,
    }
});

// Tạo model Story
const Story = FashionSocial.model("Story", StorySchema);

module.exports = Story;
