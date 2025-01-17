import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./css/HomeForm.module.css";
import { Post, User } from "../../types";
import PostsDisplay from "../profile/Post/PostsDisplay";
import {
    AccessUrlContext,
    AccessUrlProvider,
} from "../profile/User/AccessUrlContext";
import { getUserByUserId } from "../../sercives/api";
import { lightTheme } from "../../themes/theme";
import StoryDisplay from "./StoryDisplay";

const HomeForm = () => {
    const [userData, setUserData] = useState<User>();
    const [isDisplayTool, setIsDisplayTool] = useState(false);
    const toggleDisplayToolBox = () => {
        setIsDisplayTool((prev) => !prev);
    };
    useEffect(() => {
        fetchData(); // Call fetchData inside useEffect
    }, []);
    const fetchData = async () => {
        setUserData(await getUserByUserId());
    };

    const backgr = {
        backgroundColor: lightTheme.colors.primary, // Inline background color style

    };
    // const updatePostsState = async (returnPost: Post | undefined) => {
    //   try {
    //     await fetchData();
    //   } catch (error) {
    //     console.error("Error updating post state:", error);
    //   }
    // };
    return (
        <div style={backgr} className={style.coverContainer}>
            <div className={style.bodyContainer}>

                <AccessUrlProvider type="home" userId={localStorage.getItem("user_id")}>
                    <StoryDisplay />
                    <PostsDisplay />
                </AccessUrlProvider>
            </div>
        </div>
    );
};

export default HomeForm;
