import React from 'react'
import { adaptV4Theme, Box, TextField, Input, IconButton } from '@mui/material'
import { Abc, EmojiEmotionsOutlined, SendOutlined } from '@mui/icons-material'
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from 'react';
import { Recipent } from '../../types';
import { useSelectedUser } from './SelectedUserContext';
import { useSocket } from './SocketContext'
import { MessageComponentType } from '../../types';
import { lightTheme } from '../../themes/theme';
import uploadToCloudinary from '../profile/UploadImage';

interface MessageInputProps {
  recipent: Recipent | null
}


interface message {
  id: string,
  senderId: string,
  senderName: string,
  senderAvatar: string,
  content: string,
  timestamp: string
};


const MessageInput: React.FC<MessageInputProps> = ({ recipent }) => {
  const [message, setMessage] = useState<string>("");
  const { messages, setMessages, sendMessage } = useSocket();
  const currentEmail = localStorage.getItem("email");
  const { selectedUserEmail } = useSelectedUser();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageLink = await uploadToCloudinary(file);
      const newMessage: MessageComponentType = {
        content: "",
        timeStamp: new Date().toISOString(),
        isSender: true,
        image: imageLink,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const url = `http://localhost:5000/api/v1/message/post?senderEmail=${currentEmail}&recipentEmail=${selectedUserEmail}&image=${imageLink}`;
      sendMessage({ ...recipent, content: "" }); // Ensure proper object for `sendMessage`
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error("Failed to post message");
        }
      } catch (error) {
        console.error("Error posting message:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      const newMessage: MessageComponentType = {
        content: message,
        timeStamp: new Date().toISOString(),
        isSender: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const url = `http://localhost:5000/api/v1/message/post?senderEmail=${currentEmail}&recipentEmail=${selectedUserEmail}&content=${message}`;
      sendMessage({ ...recipent, content: message }); // Ensure proper object for `sendMessage`
      setMessage("");
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error("Failed to post message");
        }
      } catch (error) {
        console.error("Error posting message:", error);
      }
    }
  };

  return (
    <Box
      id="inputWrapper"
      height="80px"
      width="100%"
      bgcolor={lightTheme.colors.background}
    >
      <Box
        padding="10px"
        height="100%"
        width="100%"
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}
      >
        <div>
          <label htmlFor="file-input">
            <IconButton component="span">
              <AddIcon fontSize="large" />
            </IconButton>
          </label>
          <Input
            id="file-input"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Type your message here"
          variant="standard"
          sx={{ flexGrow: 1 }}
        />
        <IconButton type="submit">
          <SendOutlined sx={{ color: "action.active" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MessageInput;
