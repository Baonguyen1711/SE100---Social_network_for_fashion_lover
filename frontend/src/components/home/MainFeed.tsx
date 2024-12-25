import React, { useState, useEffect } from "react";
import {
    Box,
    ImageList,
    ImageListItem,
    Modal,
    TextField,
    Button,
    Avatar,
    Typography,
    IconButton,
} from "@mui/material";
import { ThumbUp, Comment, Share } from "@mui/icons-material";
import { PostResponse, Post } from "../../types";
import DetailPostHomeModal from "./DetailPostHomeModal";
import style from "./css/MainFeed.module.css";

const MainFeed = () => {
    const [posts, setPosts] = useState<Post[]>([]); // Danh sách bài viết
    const [selectedPost, setSelectedPost] = useState<Post | null>(null); // Bài viết được chọn để xem chi tiết
    const [newPostContent, setNewPostContent] = useState<string>(""); // Nội dung bài viết mới
    const [loading, setLoading] = useState<boolean>(false); // Trạng thái đang tải

    // Fetch bài viết từ API
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const userId = localStorage.getItem("userId");
            const url = `http://localhost:5000/api/v1/post/posts?userId=${userId}`;

            try {
                const response = await fetch(url, { method: "GET" });
                if (!response.ok) {
                    throw new Error(`Error fetching posts: ${response.status}`);
                }

                const data: PostResponse = await response.json();
                if (Array.isArray(data.recommentPost) && data.recommentPost.length > 0) {
                    setPosts(data.recommentPost); // Gán bài viết
                } else {
                    console.log("No posts found");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Xử lý nhấp vào bài viết
    const handlePostClick = (post: Post) => {
        setSelectedPost(post); // Mở modal với bài viết được chọn
    };

    // Đóng modal chi tiết bài viết
    const handleCloseModal = () => {
        setSelectedPost(null);
    };

    // Xử lý tạo bài đăng mới
    const handleCreatePost = async () => {
        if (!newPostContent.trim()) return;

        const userId = localStorage.getItem("userId");
        const url = `http://localhost:5000/api/v1/post/create`;
        const newPost = {
            userId,
            content: newPostContent,
            images: [], // Bạn có thể thêm xử lý để upload hình ảnh
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error(`Error creating post: ${response.status}`);
            }

            const createdPost = await response.json();
            setPosts((prevPosts) => [createdPost, ...prevPosts]); // Thêm bài đăng vào danh sách
            setNewPostContent(""); // Xóa nội dung sau khi đăng
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <Box sx={{ backgroundColor: '#CBD9C4', padding: '20px', overflowY: 'auto' }}>
            <Box sx={{ width: "100%", height: "100%", overflowY: "scroll", padding: "16px" }}>
                {/* Khu vực để tạo bài đăng */}
                <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', marginRight: '25px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Avatar
                            src=""
                            sx={{ height: '50px', width: '50px', marginRight: '10px' }}
                        />
                        <TextField
                            fullWidth
                            placeholder="Share something..."
                            variant="outlined"
                            sx={{ borderRadius: '50px', marginRight: '10px' }}
                        />
                        <Button variant="contained" sx={{ textTransform: 'none', backgroundColor: '#5f9c6e' }}>Post</Button>
                    </Box>
                    <Box sx={{ display: 'flex', marginTop: '10px' }}>
                        <Button variant="outlined" sx={{ textTransform: 'none', marginRight: '10px' }}>Live Video</Button>
                        <Button variant="outlined" sx={{ textTransform: 'none', marginRight: '10px' }}>Photos</Button>
                        <Button variant="outlined" sx={{ textTransform: 'none', marginRight: '10px' }}>Feeling</Button>
                    </Box>
                </Box>

                {/* Hiển thị danh sách bài viết */}
                <ImageList variant="masonry" cols={2} gap={16}>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <ImageListItem
                                key={post._id}
                                className={style.imageItem}
                                onClick={() => handlePostClick(post)}
                            >
                                <img
                                    src={post.images[0] || "/default-image.jpg"} // Sử dụng hình mặc định nếu không có ảnh
                                    alt={post.content}
                                    loading="lazy"
                                    className={style.image}
                                />
                                <div className={style.overlay}>
                                    <Typography variant="h6">{post.title}</Typography>
                                </div>
                            </ImageListItem>
                        ))
                    ) : (
                        <Typography>No posts available</Typography>
                    )}
                </ImageList>

                {/* Modal chi tiết bài viết */}
                <Modal
                    open={!!selectedPost}
                    onClose={handleCloseModal}
                    sx={{ backdropFilter: "blur(2px)" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "background.paper",
                            outline: "none",
                            boxShadow: 24,
                            borderRadius: "8px",
                            width: "80%",
                            maxHeight: "90%",
                            overflowY: "auto",
                            padding: "16px",
                        }}
                    >
                        {selectedPost && <DetailPostHomeModal post={selectedPost} onClose={handleCloseModal} />}
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default MainFeed;
