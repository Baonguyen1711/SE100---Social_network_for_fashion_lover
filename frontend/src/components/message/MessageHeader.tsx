import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'
import { MoreHorizOutlined } from '@mui/icons-material'
import { useSelectedUser } from './SelectedUserContext'




const MessageHeader = ({
    avatar = "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/451270082_1185848232626306_1812262998793060985_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHdJebdYHUi0wsO5KaqLPeU2uvA1eVodLva68DV5Wh0u94hVLxba4_kQMK5Mhgj0BuGsXqmAtmjjHRGmA1p5JGn&_nc_ohc=9Szq1y4W8jwQ7kNvgH1AzSG&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=ACEIKB0LvyBwojOEobxQWMk&oh=00_AYD8MKeqA3DI7E2FGEDTCf8ImrJMIk4rSJCD9EMz698Vog&oe=67250BA8"
}) => {

    const { selectedUserEmail } = useSelectedUser()
    const name = localStorage.getItem("email")  
    return (

        <Box
            component="div"
            id="messageHeader"
            height="80px"
            bgcolor="#ffffff"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginLeft="2px"
            borderRadius="0px 10px"
            sx={{
                boxShadow: "0px 2px 10px -5px rgba(0, 0, 0, 0.2)"
            }}
        >

            <Box
                component="div"
                id="user"
                display="flex"
                height="100%"
                justifyContent="space-between"
            >
                <Avatar src={avatar} sx={{ height: "100%", width: "80px", marginRight: "10px", marginLeft: "10px" }} />
                <Typography variant="h6" alignContent="center" color="#A1A7B3">{selectedUserEmail}</Typography>
            </Box>

            <MoreHorizOutlined sx={{
                marginRight: "30px",
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                    cursor: 'pointer', // Change cursor to pointer on hover
                }
            }} />
        </Box>
    )
}

export default MessageHeader