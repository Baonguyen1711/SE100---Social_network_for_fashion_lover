import React from 'react'
import { Box, Avatar, Typography, Link, TextField, InputAdornment, Stack, List, ListItem, ListItemText, ListItemAvatar, ImageList, ImageListItem, Divider } from '@mui/material'
import { SearchOutlined, MessageOutlined } from '@mui/icons-material'
import useRecentChats from '../../hooks/chat/useRecentChats'
import { useEffect, useState } from 'react'
import { useSelectedUser } from './SelectedUserContext'
import { useSocket } from './SocketContext'

interface message {
  _id: string,
  latestMessage: string,
  sendAt: string
}

const imageData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];


const SideBar = () => {

  //const recentMessages = useRecentChats("Baonguyen2110@gmail.com")
  


  const email = localStorage.getItem("email")
  const {selectedUserEmail,setSelectedUserEmail} = useSelectedUser()
  const {recentChats, setRecentChats} = useSocket()

  const [dataArray, setDataArray] = useState<message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<string>("")
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")

  useEffect(() => {
    if (!localStorage.getItem("recentChats")) {
      localStorage.setItem("recentChats", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://127.0.0.1:5000/api/v1/message/recent?email=${email}`
      try {



        const response = await fetch(url, {
          method: "GET"
        })

        if (!response.ok) {
          throw new Error(`Error in getting message`);
        }


        const data = await response.json()
        const recentMessages = data.recentMessages
        setRecentChats(recentMessages)
        const localMessages = JSON.parse(localStorage.getItem("recentChats") || "[]")
        setDataArray([...recentMessages, ...localMessages])


        return recentMessages


      } catch (e) {
        console.log("Some errors happen", e)
        return []
      } finally {
        setLoading(false)
      }
    };

    fetchData();

  }, []);



  if (loading) {
    return (
      <div>loading</div>
    )
  }

  return (

    <Box
      component="div"
      id="rightBar"
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      justifyItems="center"
      bgcolor={backgroundColor}
    >
      <Box
        component="div"
        id="mainRightBar"
        width="80%"
        height="65%"
        padding="20px"
        bgcolor="#ffffff"
        marginTop="10%"
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Search for chat" variant="standard" />
        </Box>



        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {
            recentChats.map((message) => (
              <ListItem
                key={message._id}

                onClick={()=>
                  {setSelectedUserEmail(message._id)}
                }


                

                sx={{
                  height: "100px",
                  backgroundColor: selectedUserEmail===message._id?"rgba(0, 0, 0, 0.08)":"#ffffff",
                  borderRadius: "10px",
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                    cursor: 'pointer', // Change cursor to pointer on hover
                  },
                  
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <SearchOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={message._id} secondary={<span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '200px', // Adjust width as needed
                    display: 'block', // Ensures the span behaves as a block element
                  }}
                >
                  {message.latestMessage}
                </span>} />

                <Typography
                    variant="caption"
                    sx={{
                      position:"relative",
                      bottom: "-13px"
                    }}
                  >
                    {new Date(message.timeStamp).toLocaleString().slice(0, 9)}

                  </Typography>
              </ListItem>
            ))
          }

        </List>

        <Divider orientation="horizontal"></Divider>
        <div style={{ width: "100%", height: '450px', overflowY: 'auto' }}>

        <ImageList cols={2} rowHeight={100}
          
          >
            {imageData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
  
        </div>
       
      </Box>
    </Box>

  )

}

export default SideBar