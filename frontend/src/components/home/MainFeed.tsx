import React from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, Avatar, Grid, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

const MainFeed: React.FC = () => {
    return (
        <Box sx={{ backgroundColor: '#CBD9C4', padding: '20px' }}>
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
            <Card sx={{ backgroundColor: 'white', borderRadius: '10px', marginBottom: '20px', padding: '20px' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <Avatar sx={{ height: '50px', width: '50px', marginRight: '10px' }}>A</Avatar>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Afrin Konjufca</Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>Tirana, Albania</Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                        <Grid item xs={4}>
                            <CardMedia
                                component="img"
                                image="https://via.placeholder.com/150"
                                alt="Post Image 1"
                                sx={{ borderRadius: '10px' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CardMedia
                                component="img"
                                image="https://via.placeholder.com/150"
                                alt="Post Image 2"
                                sx={{ borderRadius: '10px' }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CardMedia
                                component="img"
                                image="https://via.placeholder.com/150"
                                alt="Post Image 3"
                                sx={{ borderRadius: '10px' }}
                            />
                        </Grid>
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
