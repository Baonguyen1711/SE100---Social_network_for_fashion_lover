import React, { useState } from 'react'
import SideBar from '../../components/sideBar/SideBar'
import RecentChats from '../../components/message/RecentChats'
import MainMessage from '../../components/message/MainMessage'
import Header from '../../components/layout/Header'
//import Palette from '../../components/palette/Palette'
import { lightTheme } from '../../themes/theme'
import PublicLayout from '../../Layout'

import { SelectedUserProvider } from '../../components/message/SelectedUserContext'
import { SocketProvider } from '../../components/message/SocketContext'
import { BackgroundProvider, useBackground } from '../../components/message/BackgroundContext'
import { Grid2, ToggleButton, Box,Divider } from '@mui/material'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'

const MessagePage = () => {
  const { backgroundImageOver } = useBackground();
  return (
    <BackgroundProvider>
      <SocketProvider>
        <SelectedUserProvider>
          <PublicLayout 
            mainContent={<MainMessage/>}  
            recentChatsContent={<RecentChats/>}
            //extraContent={<Palette imgSrc={backgroundImageOver} />}
          />
          {/* <MessagePageContent /> */}
        </SelectedUserProvider>
      </SocketProvider>
    </BackgroundProvider>
  );
};

export default MessagePage;
