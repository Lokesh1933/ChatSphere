import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Text } from '@chakra-ui/react'

const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const {user,selectedChat,setSelectedChat} = ChatState()
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
                    >
                        {/* Icon button displayed only when display is small */}
                        
                    </Text>
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans" color="gray.500">Click on a user to start chatting</Text>
                </Box>
            )
        }
    </>
  )
}

export default SingleChat
