import React from 'react'
import { Grid2, Paper } from '@mui/material'
import { Outlet } from 'react-router-dom'
import PublicLayout from "../../../Layout";
import SideBar from '../../../components/sideBar/SideBar';
import { SelectedUserProvider } from '../../../components/message/SelectedUserContext';
import { SocketProvider } from '../../../components/message/SocketContext';
import { BackgroundProvider, useBackground } from '../../../components/message/BackgroundContext';


const FavouritePage = () => {
  const { backgroundImageOver } = useBackground();
  return (
    <BackgroundProvider>
      <SocketProvider>
        <SelectedUserProvider>
          <PublicLayout 
            mainContent={<Outlet />}  
            recentChatsContent={<></>}
            //extraContent={<Palette imgSrc={backgroundImageOver} />}
          />
          {/* <MessagePageContent /> */}
        </SelectedUserProvider>
      </SocketProvider>
    </BackgroundProvider>
  );
};

export default FavouritePage;

