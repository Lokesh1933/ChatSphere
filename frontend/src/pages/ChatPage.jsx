import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const ChatPage = () => {
  // const [chats,setChats] = useState([])
  const fetchChats = async () => {
    const data = await axios.get('/api/chat')
    console.log(data)
    
  }
  useEffect(() => {
    fetchChats()
  }, [])
  return (
    <div>
      {/* {chats.map()} */} hello
    </div>
  )
}

export default ChatPage
