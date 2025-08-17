import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from '../config/ChatLogic'
import ProfileModal from './miscellaneous/ProfileModal'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal'
import axios from 'axios'
import './styles.css'
import ScrollableChat from './ScrollableChat'

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat} = ChatState()
    const [messages,setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const toast = useToast()
    const fetchMessages = async () => {
        if (!selectedChat) return
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            setLoading(true) 
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config)
            console.log(messages)
            setMessages(data)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error Occurred",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    useEffect(() => {
        fetchMessages()
    }, [selectedChat])
    //below is async function as there is api call being made
    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
           try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }
            setNewMessage("")
            const {data} = await axios.post("/api/message", { content: newMessage, chatId: selectedChat._id }, config)
            // console.log(data)
            
            setMessages([...messages, data])
            //below used for message updating
            // setFetchAgain(!fetchAgain)
           } catch (error) {
            toast({
                title: "Error Occurred",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
           }
        }
    }
    const typingHandler = (e) => {
        setNewMessage(e.target.value)
        // typing indicator logic
    }
  return (
    <>
        {
            selectedChat ? (
                <>
                    <Text
                        fontSize={{base:"28px",md:"30px"}}
                        pb={3}
                        px={2}
                        width="100%"
                        display="flex"
                        justifyContent={{base:"space-between"}}
                        alignItems="center"
                        color="white" 
                        fontFamily="Work sans"
                    >
                        {/* Icon button displayed only when display is small */}
                        <IconButton
                            display={{base:"flex",md:"none"}}
                            icon={<ArrowBackIcon/>}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user,selectedChat.users)}
                                <ProfileModal user={getSenderFull(user,selectedChat.users)} />
                            </>
                        ):(
                            <> 
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                    fetchMessages={fetchMessages}
                                />
                                
                            </>
                        )}
                    </Text>
                     <Box
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="gray.800"  
                        width="100%"
                        height="100%"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="teal.400"  
                        overflowY="hidden"
                    >
                        {/* Messages are displayed here */}
                        {loading ? (
                            <Spinner 
                                size="xl"
                                width={20}
                                height={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ):(
                            <div className='messages'>
                                <ScrollableChat messages={messages}/>
                            </div>
                        )}
                        {/* press enter to send message */}
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            <Input
                                variant="filled"
                                bg="gray.700"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={typingHandler}
                                autoComplete='off'
                                spellCheck='false'
                            />
                        </FormControl>
                     </Box>  
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans" color="white" fontWeight="bold" opacity={0.9}>Click on a user to start chatting</Text>
                </Box>
            )
        }
    </>
  )
}

export default SingleChat
