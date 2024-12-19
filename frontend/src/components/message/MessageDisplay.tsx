import React, { ReactEventHandler, useRef, useEffect } from 'react'
import MessageComponent from './MessageComponent'
import { Box } from '@mui/material'
import { MessageComponentType } from '../../types'
import { useSelectedUser } from './SelectedUserContext'
import { useSocket } from './SocketContext'
import { useState } from 'react'


interface MessageComponentArray {
  messages: MessageComponentType[] | []
}

const MessageDisplay: React.FC<MessageComponentArray> = () => {

  const scrollRef = useRef<HTMLDivElement>(null);
  const recipentEmail = localStorage.getItem("email")
  const { selectedUserEmail } = useSelectedUser()
  const [recentMessages, setRecentMessages] = useState<MessageComponentType[]>([])
  const {messages, setMessages} = useSocket();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {

    const getMessagesHistory = async () => {
      if (!selectedUserEmail) {
        return 
      }
      debugger;
      const url = `http://localhost:5000/api/v1/message/history?senderEmail=${selectedUserEmail}&recipentEmail=${recipentEmail}`

      try {
        const response = await fetch(url)

        if (!response.ok) {
          console.log("get history fail")
          throw new Error("get history fail")


        }

        const data = await response.json()
        setRecentMessages(data.chatHistory)


      } catch (e) {
        console.log("Some errors happen", e)
      }


    }

    getMessagesHistory()
    return (()=> {

    })

  }, [selectedUserEmail])


  return (
    <Box
      ref={scrollRef}
      component="div"
      height="100%"
      bgcolor="#CBD9C4"
      marginTop="2px"
      padding="20px"
      sx={{
        overflowY: "auto"
      }}
    >
      {
        [...recentMessages,...messages].map((message) => (

          <MessageComponent
            key={message.timeStamp}
            content={message.content}
            timeStamp={message.timeStamp}
            isSender={message.isSender}
          />

        ))
      }

    </Box>
  )
}

export default MessageDisplay