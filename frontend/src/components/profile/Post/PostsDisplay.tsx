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
  const [userName, setUserName] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>("");
  const currentEmail = localStorage.getItem("email");
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
    //console.log("urldsdads",url)
    fetchData(); // Call fetchData inside useEffect
  }, [url]);
  const fetchData = async () => {
    if (!url) return;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error in getting message");
      }
      const data = await response.json();
      console.log("data123",data)
      setPostsData(data.posts);
      setUser(data.user);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  return (
    <Box sx={{ width: "100", mx: "auto", mt: 4 }}>
      {/* Top post input area */}
      {user?._id === localStorage.getItem("userId") ? (
        <PostRequestBar
          user={user}
          toggleDisplayToolBox={toggleDisplayToolBox}
          isDisplayTool={isDisplayTool}
          updatePostsState={updatePostsState}
        />
      ) : (
        ""
      )}

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
