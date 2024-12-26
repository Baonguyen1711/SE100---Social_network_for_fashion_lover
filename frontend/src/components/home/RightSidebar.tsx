import React from 'react';
import { Box, Typography, List, ListItem, Avatar, TextField, Button, IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const RightSidebar: React.FC = () => {
    return (
        <Box sx={{ width: '100%', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
            {/* Search Bar */}
            <TextField
                fullWidth
                placeholder="Search for chat"
                variant="outlined"
                sx={{ marginBottom: '20px', borderRadius: '50px' }}
            />

            {/* Recent Chats */}
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                Recent Chats
            </Typography>
            <List>
                {['Julia Clarke', 'Sara Ciene', 'Amy Ruth'].map((name, index) => (
                    <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Avatar sx={{ height: '40px', width: '40px', marginRight: '10px' }}>{name[0]}</Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{name}</Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>{`City, Country`}</Typography>
                        </Box>
                        <IconButton>
                            <ChatBubbleOutlineIcon />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            {/* Suggestions */}
            <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '10px' }}>
                You might like
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px', backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}>
                <Avatar sx={{ height: '40px', width: '40px', marginRight: '10px' }}>G</Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Gucci</Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>15 Mutuals</Typography>
                </Box>
                <Button variant="contained" sx={{ textTransform: 'none', marginRight: '10px', backgroundColor: '#5f9c6e' }}>Follow</Button>
                <Button variant="outlined" sx={{ textTransform: 'none' }}>Ignore</Button>
            </Box>

            {/* Upcoming Events */}
            <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '10px' }}>
                Upcoming Events
            </Typography>
            <List>
                {['Milan Fashion Week', 'London Fashion Week'].map((event, index) => (
                    <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'white', marginBottom: '10px', padding: '10px', borderRadius: '10px' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>{event}</Typography>
                        <Typography variant="body2" sx={{ color: 'gray', marginBottom: '10px' }}>12 Oct, 13:00 IST</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Avatar sx={{ height: '30px', width: '30px', marginRight: '-10px', zIndex: 3 }} />
                            <Avatar sx={{ height: '30px', width: '30px', marginRight: '-10px', zIndex: 2 }} />
                            <Avatar sx={{ height: '30px', width: '30px', zIndex: 1 }} />
                            <Typography variant="body2" sx={{ marginLeft: '10px' }}>112 Joined</Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default RightSidebar;
