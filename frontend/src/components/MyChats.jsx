import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Button, Stack, Text, useToast, Flex, Icon, Avatar, Badge } from '@chakra-ui/react'
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'
import { FaUsers, FaComments, FaCode } from 'react-icons/fa'
import ChatLoading from './ChatLoading'
import { getSender } from '../config/ChatLogic'
import GroupChatModal from './miscellaneous/GroupChatModal'

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState("")
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState()
  const toast = useToast()

  const fetchChats = async () => {
    if (!user) return
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get('/api/chat', config)
      setChats(data)
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats()
  }, [fetchAgain])

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="gray.800"
      width={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="2px"
      borderColor="cyan.400"
      fontFamily="'Fira Code', monospace"
      boxShadow="0 4px 20px rgba(0, 255, 255, 0.1)"
      position="relative"
      mb={6}
      
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, transparent, cyan.400, transparent)",
        borderRadius: "lg lg 0 0"
      }}
    >
      {/* Header */}
      <Box
        pb={3}
        px={2}
        fontSize={{ base: "18px", md: "16px" }}
        fontFamily="'Fira Code', monospace"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="2px solid"
        borderColor="gray.600"
        bg="gray.750"
        borderRadius="lg"
        p={3}
        mb={2}
      >
        <Flex align="center" gap={2} color="cyan.400" fontWeight="bold">
          {/* <Icon as={FaCode} boxSize={5} /> */}
          <Text fontSize="lg">{"My Chats"}</Text>
        </Flex>

        <GroupChatModal>
          
        <Button
          display="flex"
          fontSize={{ base: "11px", md: "9px", lg: "11px" }}
          rightIcon={<AddIcon />}
          bg="gradient(linear, to-r, cyan.500, blue.500)"
          color="white"
          size="sm"
          borderRadius="full"
          _hover={{ 
            bg: "gradient(linear, to-r, cyan.400, blue.400)",
            transform: "translateY(-2px)",
            boxShadow: "0 4px 15px rgba(0, 255, 255, 0.3)"
          }}
          _active={{
            transform: "translateY(0px)"
          }}
          fontFamily="'Fira Code', monospace"
          transition="all 0.2s ease"
          px={4}
          >
          {"New Group Chat"}
        </Button>

        </GroupChatModal>
      </Box>

      {/* Chat List Container */}
      <Box
        display="flex"
        flexDir="column"
        bg="gray.750"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.600"
        
        
      >
        {chats ? (
          <Stack 
            spacing={0} 
            overflowY="auto"
            maxH="70vh"
            // pb={6}
            css={{
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#2D3748',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'linear-gradient(45deg, #00BCD4, #0097A7)',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'linear-gradient(45deg, #00E5FF, #00BCD4)',
              },
            }}
          >
            {chats.map((chat, index) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? 
                  "linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 188, 212, 0.1))" : 
                  "transparent"
                }
                color={selectedChat === chat ? "cyan.100" : "gray.300"}
                px={4}
                py={3}
                key={chat._id}
                borderBottom={index !== chats.length - 1 ? "1px solid" : "none"}
                borderColor="gray.600"
                _hover={{
                  bg: selectedChat === chat ? 
                    "linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(0, 188, 212, 0.2))" :
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.05), transparent)",
                  transform: "translateX(3px)",
                  borderLeft: "3px solid",
                  borderLeftColor: "cyan.400"
                }}
                transition="all 0.3s ease"
                position="relative"
                _after={selectedChat === chat ? {
                  content: '""',
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  background: "linear-gradient(to bottom, cyan.400, blue.400)"
                } : {}}
              >
                <Flex align="center" gap={3} mb={1}>
                  <Box position="relative">
                    <Avatar 
                      size="sm" 
                      name={!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                      bg={chat.isGroupChat ? "purple.500" : "teal.500"}
                      color="white"
                    />
                    {chat.isGroupChat && (
                      <Badge
                        position="absolute"
                        top="-2px"
                        right="-2px"
                        bg="orange.400"
                        color="white"
                        borderRadius="full"
                        fontSize="8px"
                        minW="16px"
                        h="16px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={FaUsers} boxSize={2} />
                      </Badge>
                    )}
                  </Box>
                  
                  <Box flex={1} minW={0}>
                    <Text 
                      fontWeight="bold" 
                      fontSize="sm"
                      noOfLines={1}
                      color={selectedChat === chat ? "cyan.100" : "white"}
                    >
                      {!chat.isGroupChat 
                        ? getSender(loggedUser, chat.users) 
                        : chat.chatName
                      }
                    </Text>
                    
                    {chat.latestMessage && (
                      <Text 
                        fontSize="xs" 
                        color={selectedChat === chat ? "cyan.200" : "gray.400"} 
                        noOfLines={1}
                        mt={1}
                      >
                        <Text as="span" fontWeight="semibold" color="cyan.300">
                          {chat.latestMessage.sender.name}:
                        </Text>{" "}
                        {chat.latestMessage.content.length > 35
                          ? chat.latestMessage.content.substring(0, 32) + "..."
                          : chat.latestMessage.content
                        }
                      </Text>
                    )}
                  </Box>
                  
                  {/* Online indicator or unread count could go here */}
                  <Box
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg={selectedChat === chat ? "cyan.300" : "green.400"}
                    opacity={selectedChat === chat ? 1 : 0.6}
                  />
                </Flex>
              </Box>
            ))}
          </Stack>
        ) : (
          <Box p={4}>
            <ChatLoading />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MyChats
