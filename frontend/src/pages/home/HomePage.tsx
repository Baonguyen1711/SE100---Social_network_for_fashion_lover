import React from 'react';
import { Box, Grid } from '@mui/material';
import SideBar from '../../components/sideBar/SideBar';
import MainFeed from '../../components/home/MainFeed';
import RightSidebar from '../../components/home/RightSidebar';
import SideBarHome from '../../components/sideBar/SideBarRight/Home/SideBarHome';
import NotFollowContainer from '../../components/sideBar/SideBarRight/Home/NotFollowContainer';
import CardUpCommingEvent from '../../components/sideBar/SideBarRight/Home/CardUpCommingEvent';
import CardMightLikeBox from '../../components/sideBar/SideBarRight/Home/CardMightLikeBox';

const HomePage: React.FC = () => {
    return (
        <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
            {/* Sidebar */}
            <Grid item xs={12} sm={3} md={2} sx={{ backgroundColor: '#f0f4f5', padding: '20px', display: { xs: 'none', sm: 'block' } }}>
                <SideBar isOpened />
            </Grid>

            {/* Main Feed */}
            <Grid item xs={12} sm={7} md={8} sx={{ padding: '20px', backgroundColor: '#ffffff' }}>
                <MainFeed />
            </Grid>

            {/* Right Sidebar */}
            <Grid item xs={12} sm={2} md={2} sx={{ backgroundColor: '#f9f9f9', padding: '20px', display: { xs: 'none', md: 'block' } }}>
                <SideBarHome />
                <NotFollowContainer />
                <CardUpCommingEvent />
            </Grid>
        </Grid>
    );
};

export default HomePage;
