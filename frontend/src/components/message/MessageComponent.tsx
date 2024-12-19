import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
import { MessageComponentType } from '../../types'

const MessageComponent: React.FC<MessageComponentType> = ({ content, timeStamp, isSender }) => {
    return (
        isSender ?
            <Box
            component="div"
            minHeight="60px"
            maxWidth="500px"
            display="block"
            width="100%"
            marginBottom="20px"
            >
                <Box
                    component="div"
                    minHeight="60px"
                    maxWidth="500px"
                    display="flex"
                    width="auto"
                    marginBottom="20px"
                >
                    <Avatar src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/451270082_1185848232626306_1812262998793060985_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHdJebdYHUi0wsO5KaqLPeU2uvA1eVodLva68DV5Wh0u94hVLxba4_kQMK5Mhgj0BuGsXqmAtmjjHRGmA1p5JGn&_nc_ohc=9Szq1y4W8jwQ7kNvgH1AzSG&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=ACEIKB0LvyBwojOEobxQWMk&oh=00_AYD8MKeqA3DI7E2FGEDTCf8ImrJMIk4rSJCD9EMz698Vog&oe=67250BA8" />
                    <Box
                        component="div"
                        fontFamily="Inter"
                        color="#acb1bc"
                        width="auto"
                        height="auto"
                        bgcolor="#e6f5de"
                        border="green"
                        borderRadius="10px"
                        padding="10px"
                        marginLeft="10px"
                    >
                        {content} <br />
                        <Typography variant="caption" fontFamily="Inter" color="black">{timeStamp}</Typography>
                    </Box>
                </Box>
            </Box>
                

            :
            <Box
                component="div"
                minHeight="60px"
                display="flex"
                alignContent="flex-end"
                width="100%"
                marginBottom="20px"
                marginRight="40px"

            >
                <Box
                    component="div"
                    fontFamily="Inter"

                    display="block"
                    color="#acb1bc"
                    width="auto"
                    height="auto"
                    bgcolor="#e6f5de"
                    border="green"
                    borderRadius="10px"
                    padding="10px"
                    marginLeft="auto"
                >
                    {content} <br />
                    <Typography variant="caption" fontFamily="Inter" color="black">{timeStamp}</Typography>
                </Box>
            </Box>



    )
}

export default MessageComponent