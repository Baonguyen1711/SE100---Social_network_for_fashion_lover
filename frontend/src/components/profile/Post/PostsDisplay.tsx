import React, { useState, useEffect, useContext } from "react";
import PostInformationCard from "./PostInformationCard";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    TextField,
    Stack,
    Typography,
} from "@mui/material";
import {
    AddReaction,
    AddPhotoAlternate,
    Comment,
    Share,
    MoreVert,
    ThumbUp,
    BookmarkBorder,
    Edit,
    Delete,
    VisibilityOff,
} from "@mui/icons-material";
import style from "./css/PostsDisplay.module.css";
import PostToolDisplay from "./PostToolDisplay";
import { Like, Post, User, PostResponse } from "../../../types";
import { PostProvider } from "./PostContext";
import PostRequestBar from "./PostRequestBar";
import { AccessUrlContext } from "../User/AccessUrlContext";
import { useParams } from "react-router-dom";

const PostsDisplay = () => {
    const [isDisplayTool, setIsDisplayTool] = useState(false);
    const [postsData, setPostsData] = useState<Post[]>([]);
    const [user, setUser] = useState<User>();
    const { url, setUrl } = useContext(AccessUrlContext)!;
    const [userName, setUserName] = useState<string>("")
    const [userAvatar, setUserAvatar] = useState<string>("")
    const currentEmail = localStorage.getItem("email")
    const toggleDisplayToolBox = () => {
        setIsDisplayTool((prev) => !prev);
    };
    const [selectedImage, setSelectedImage] = useState<Post | null>(null);

    const updatePostsState = async () => {
        try {
            fetchData();
        } catch (error) {
            console.error("Error updating post state:", error);
        }
    };
    useEffect(() => {
        fetchData();
        const getUserInfo = async () => {

            try {
                const url = `http://127.0.0.1:5000/api/v1/user/info?email=${currentEmail}`

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                })

                if (!response.ok) {
                    throw new Error(`Error in getting message`);
                }



                const data = await response.json()
                debugger;
                //console.log("user data", data)
                setUserAvatar(data.userInfo.avatar)
                setUserName(`${data.userInfo.firstname} ${data.userInfo.lastname}`)

                console.log(userAvatar)
                console.log(userName)
            } catch (e) {
                console.log("Some errors happen", e)
            }

        }

        getUserInfo()
    }, [url]);
    const fetchData = async () => {
        const userId = localStorage.getItem("user_id")
        const url = `http://localhost:5000/api/v1/post/getposthome?userId=${userId}`;
        try {
            const response = await fetch(url, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Error in getting message");
            }
            const data: PostResponse = await response.json();
            console.log(data)
            if (data.recommentPost.length > 0) {
                setPostsData(data.recommentPost);
                console.log("check log post", data.recommentPost)
            } else {
                console.log("No posts found");
            }
        } catch (e) {
            console.error("Error fetching data:", e);
        }
    };

    return (
        <Box sx={{ width: "100", mx: "auto", mt: 4 }}>
            {/* Top post input area */}
            <PostRequestBar
                user={user}
                toggleDisplayToolBox={toggleDisplayToolBox}
                isDisplayTool={isDisplayTool}
                updatePostsState={updatePostsState}
            />
            {postsData != undefined && postsData?.length > 0
                ? postsData?.map((post, index) => {
                    return (
                        <PostProvider post={post} key={post._id}>
                            <PostInformationCard updatePostsState={updatePostsState} />
                        </PostProvider>
                    );
                })
                : "Don't have any post"}
        </Box>
    );
};

export default PostsDisplay;
