import React, { useState, useEffect, useContext } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import ModalCreateStory from "./ModalCreateStory";
import ModalViewStory from './ModalViewStory';
import { AccessUrlContext } from "../profile/User/AccessUrlContext";
import style from "./css/StoryDisplay.module.css";
import { ApiResponse } from "../../types";

const StoryDisplay = () => {
    const [selectedStory, setSelectedStory] = useState<null | { media: string, name: string }>(null);
    const [isCreatingStory, setIsCreatingStory] = useState(false);
    const [userStory, setUserStory] = useState<{ media: string, name: string } | null>(null);
    const [stories, setStories] = useState<any[]>([]);
    const [userInfo, setUserInfo] = useState<{ name: string, avatar: string } | null>(null);

    const [userName, setUserName] = useState<string>("");
    const [userAvatar, setUserAvatar] = useState<string>("");

    const { url, setUrl } = useContext(AccessUrlContext)!;
    const currentEmail = localStorage.getItem("email");

    useEffect(() => {
        const fetchAndLogStories = async () => {
            await fetchStories();
        };

        fetchAndLogStories();
        const getUserInfo = async () => {
            try {
                const url = `http://127.0.0.1:5000/api/v1/user/info?email=${currentEmail}`
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error in getting message`);
                }

                const data = await response.json();
                setUserAvatar(data.userInfo.avatar);
                setUserName(`${data.userInfo.firstname} ${data.userInfo.lastname}`);
            } catch (e) {
                console.log("Some errors happen", e);
            }
        }

        getUserInfo();
    }, [url]);

    const handleOpenStory = (story: { media: string, name: string, id: string }) => {
        setSelectedStory(story);
        markAsViewed(story.id); // Đánh dấu story đã xem
    };

    const markAsViewed = async (storyId: string) => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/story/updateisviewed", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ storyId }),
            });

            if (response.ok) {
                console.log("Story marked as viewed");
                await fetchStories();
            } else {
                console.error("Failed to mark story as viewed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCloseStory = () => {
        setSelectedStory(null);
    };

    const handleCreateStory = () => {
        setIsCreatingStory(true);
    };

    const handleCloseCreateStory = () => {
        setIsCreatingStory(false);
    };

    const fetchStories = async () => {
        const userId = localStorage.getItem("user_id");
        try {
            const response = await fetch(`http://localhost:5000/api/v1/story/getstoriesbyfollowing?userId=${userId}`, {
                method: "GET",
            });

            const data: ApiResponse = await response.json();

            if (Array.isArray(data.stories)) {
                const currentTime = new Date();

                const validStories = data.stories.filter((story) => {
                    const expiryTime = new Date(story.expiryTime);
                    return expiryTime > currentTime;
                });

                if (validStories.length > 0) {
                    setStories(validStories);
                    if (validStories[0]) {
                        setUserStory({
                            media: validStories[0].mediaUrl,
                            name: userInfo?.name || "Your Name",
                        });
                    }
                } else {
                    console.log("No valid stories found");
                }
            } else {
                console.error("Expected an array of stories but received:", data.stories);
            }
        } catch (error) {
            console.error("Error fetching stories:", error);
        }
    };

    const handleSubmitNewStory = (mediaUrl: string) => {
        const newStory = { media: mediaUrl, name: userName };
        setUserStory(newStory);
        handleCloseCreateStory();

        fetch("http://localhost:5000/api/v1/story/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: localStorage.getItem("user_id"),
                mediaUrl: mediaUrl,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Story created successfully:", data);
                fetchStories();
            })
            .catch((error) => {
                console.error("Error creating story:", error);
            });
    };

    const uploadImageToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your_upload_preset");

        const response = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        return data.secure_url;
    };

    const handleImageUpload = async (file: File) => {
        const url = await uploadImageToCloudinary(file);
        handleSubmitNewStory(url);
    };

    return (
        <Box sx={{ width: "100", mx: "auto", mt: 4 }}>
            <Box className={style.storyContainer}>
                {/* Create Your Story Section */}
                <Box className={style.storyItem} onClick={handleCreateStory}>
                    <Avatar
                        src={userAvatar}
                        alt="Your Story"
                        className={style.storyAvatar}
                    />
                    <Typography variant="caption" className={style.storyName}>
                        Your Story
                    </Typography>
                </Box>

                {/* User's own story */}


                {/* List Stories from Backend */}
                {stories.length > 0 ? (
                    stories.map((story) => (
                        <Box
                            key={story._id}
                            className={`${style.storyItem} ${story.isViewed ? style.read : style.unread}`}
                            onClick={() =>
                                handleOpenStory({
                                    media: story.mediaUrl,
                                    name: story.userInfo
                                        ? `${story.userInfo.firstname} ${story.userInfo.lastname}`
                                        : "Unknown",
                                    id: story._id,
                                })
                            }
                        >
                            <Avatar
                                src={story.userInfo?.avatar || "/images/your-avatar.jpg"}
                                alt={
                                    story.userInfo
                                        ? `${story.userInfo.firstname} ${story.userInfo.lastname}`
                                        : "Unknown"
                                }
                                className={`${style.storyAvatar} ${story.isViewed ? style.read : style.unread}`}
                            />
                            <Typography variant="caption" className={style.storyName}>
                                {story.userInfo
                                    ? `${story.userInfo.firstname} ${story.userInfo.lastname}`
                                    : "Unknown"}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="caption"></Typography>
                )}
            </Box>

            {/* Modal to view the story */}
            <ModalViewStory
                isOpen={selectedStory !== null}
                onClose={handleCloseStory}
                storyUrl={selectedStory?.media || ''}
            />

            {/* Modal to create story */}
            <ModalCreateStory
                isOpen={isCreatingStory}
                onClose={handleCloseCreateStory}
                onSubmit={handleSubmitNewStory}
            />
        </Box>
    );
};

export default StoryDisplay;
