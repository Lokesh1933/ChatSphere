import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'

const MyChats = () => {
  const [loggedUser,setLoggedUser] = useState()
  const { user, setSelectedChat, chats, setChats, notifications } = ChatState()
  const toast  =useToast()
  const fetchChats = async () => {
    try {
      const { data } = await axios.get('/api/chat', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }, //we can also use config here
      })
      setChats(data)
    } catch (error) {
      toast({
        title: "Error fetching chats",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }
  return (
    <div>
      My Chats
    </div>
  )
}

export default MyChats
