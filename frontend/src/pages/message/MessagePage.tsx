import React from 'react'
import SideBar from '../../components/sideBar/SideBar'
import RecentChats from '../../components/message/RecentChats'
import MainMessage from '../../components/message/MainMessage'
import { SelectedUserProvider} from '../../components/message/SelectedUserContext'
import { SocketProvider} from '../../components/message/SocketContext'
import { Grid2 } from '@mui/material'

const MessagePage = () => {
  return (
    <SocketProvider>
       <SelectedUserProvider>
        <Grid2 container sx={{height: "100vh"}}>
        <Grid2 size={3} >
            <SideBar/>
        </Grid2>

        <Grid2 size={6}>
            <MainMessage/>
        </Grid2>

        <Grid2 size={3}>
            <RecentChats/>
        </Grid2>
    </Grid2>
    </SelectedUserProvider>
    </SocketProvider>
   
    
  )
}

export default MessagePage