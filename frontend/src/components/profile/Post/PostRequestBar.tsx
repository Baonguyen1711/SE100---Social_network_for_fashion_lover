import { Avatar, Button, Card, Stack, TextField } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import PostToolDisplay from './PostToolDisplay'
import { AddPhotoAlternate, AddReaction } from '@mui/icons-material'
import { Post, User } from '../../../types'
import style from '../css/PostRequestBar.module.css'
import { useLocation } from 'react-router-dom'


interface Props {
    user: User | undefined
    toggleDisplayToolBox: () => void
    updatePostsState: (returnPost: Post | undefined) => void
    isDisplayTool: boolean
}

const PostRequestBar: React.FC<Props> = ({ user, toggleDisplayToolBox, isDisplayTool, updatePostsState }) => {
    const location = useLocation()
    const [userName, setUserName] = useState<string>("")
    const [userAvatar, setUserAvatar] = useState<string>("")
    console.log(location.pathname.split("/")[1])
    const currentEmail = localStorage.getItem("email")
    useEffect(() => {
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
                setUserAvatar(data.userInfo.avatar)
                setUserName(`${data.userInfo.firstname} ${data.userInfo.lastname}`)
            } catch (e) {
                console.log("Some errors happen", e)
            }

        }

        getUserInfo()
    }, []);
    return (
        <Card
            sx={{
                mb: 3,
                padding: 2,
                borderRadius: "20px !important",
                backgroundColor: "#F7F7F7",
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center" display={"flex"}>
                <Avatar alt="User Avatar" src={userAvatar} />
                <TextField
                    placeholder="Share something"
                    sx={{
                        flexGrow: 1,
                        border: "0px",
                        borderRadius: 2,
                    }}
                    multiline
                    maxRows={6}
                    fullWidth
                    onClick={toggleDisplayToolBox}
                />
            </Stack>
            <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                <Button
                    className={style.btn}
                    sx={{ margin: "0px 20px" }}
                    startIcon={<AddPhotoAlternate />}
                    onClick={toggleDisplayToolBox}
                >
                    Photos
                </Button>
                <Button
                    className={style.btn}
                    sx={{ margin: "0px 20px" }}
                    startIcon={<AddReaction />}
                    onClick={toggleDisplayToolBox}
                >
                    Feelings
                </Button>
            </Stack>
            {isDisplayTool && <PostToolDisplay isOpen={isDisplayTool} onClose={toggleDisplayToolBox} onCreatedPost={updatePostsState} />}
        </Card>
    )
}

export default PostRequestBar
