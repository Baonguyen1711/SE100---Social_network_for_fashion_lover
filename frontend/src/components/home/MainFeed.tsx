import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, Avatar, Grid, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

interface Post {
    id: string;
    title: string;
    content: string;
    images: string[];
    createdAt: string;
}

const MainFeed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch posts from the API
    const fetchPosts = async () => {
        if (loading) return; // Tránh gọi API nhiều lần khi đang tải
        setLoading(true);
        try {
            const response = await fetch(`/api/posts?page=${page}&limit=10`);
            const data = await response.json();

            console.log("Fetched data:", data); // Log để kiểm tra

            // Duyệt mảng từ `recommentPost`
            if (data.recommentPost && Array.isArray(data.recommentPost)) {
                setPosts((prevPosts) => [...prevPosts, ...data.recommentPost]); // Append bài viết
            } else {
                console.error("Unexpected response format:", data);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch posts when the component mounts or when the page changes
    useEffect(() => {
        fetchPosts();
    }, [page]);

    // Handle scroll event to load more posts when near the bottom
    const handleScroll = (event: React.UIEvent<HTMLElement>) => {
        const target = event.target as HTMLElement; // Cast event.target to HTMLElement
        const bottom = target.scrollHeight === target.scrollTop + target.clientHeight;
        if (bottom && !loading) {
            setPage((prevPage) => prevPage + 1); // Load more posts when scrolling to the bottom
        }
    };

    return (
        <Box sx={{ backgroundColor: '#CBD9C4', padding: '20px', overflowY: 'auto' }} onScroll={handleScroll}>
            {/* Post Input */}
            <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
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

            {/* Posts */}
            {posts.map((post) => (
                <Card key={post.id} sx={{ backgroundColor: 'white', borderRadius: '10px', marginBottom: '20px', padding: '20px' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <Avatar sx={{ height: '50px', width: '50px', marginRight: '10px' }}>{post.title.charAt(0)}</Avatar>
                            <Box>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{post.title}</Typography>
                                <Typography variant="body2" sx={{ color: 'gray' }}>{new Date(post.createdAt).toLocaleDateString()}</Typography>
                            </Box>
                        </Box>

                        <Typography variant="body1" sx={{ marginBottom: '20px' }}>{post.content}</Typography>

                        <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                            {post.images.map((image, index) => (
                                <Grid item xs={4} key={index}>
                                    <CardMedia
                                        component="img"
                                        image={image}
                                        alt={`Post Image ${index + 1}`}
                                        sx={{ borderRadius: '10px' }}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton>
                                    <FavoriteBorderIcon />
                                </IconButton>
                                <Typography variant="body2">340 Likes</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton>
                                    <ChatBubbleOutlineIcon />
                                </IconButton>
                                <Typography variant="body2">13 Comments</Typography>
                            </Box>
                            <IconButton>
                                <ShareIcon />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            {/* Loading Spinner */}
            {loading && (
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                    <Typography>Loading...</Typography>
                </Box>
            )}

            {/* Comment Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
                <Avatar
                    src=""
                    sx={{ height: '40px', width: '40px', marginRight: '10px' }}
                />
                <TextField
                    fullWidth
                    placeholder="Write a comment..."
                    variant="outlined"
                    sx={{ borderRadius: '50px' }}
                />
            </Box>
        </Box>
    );
};

export default MainFeed;
