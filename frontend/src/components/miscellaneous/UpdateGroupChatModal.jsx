import { ViewIcon } from '@chakra-ui/icons'
import { Box, FormControl, IconButton, Input, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
    const {isOpen,onOpen,onClose} = useDisclosure()
    const [groupChatName,setGroupChatName] = useState()
    const [search,setSearch] = useState("")
    const [searchResult,setSearchResult] = useState([])
    const [loading,setLoading] = useState(false)
    const [renameLoading,setRenameLoading] = useState(false)
    const {selectedChat,setSelectedChat,user} = ChatState()
    const toast = useToast()

    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
          toast({
            title: "Only admins can remove someone!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }

        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/api/chat/groupremove`,
            {
              chatId: selectedChat._id,
              userId: user1._id,
            },
            config
          );

          user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          
          setLoading(false);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
        setGroupChatName("");
    };

    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
          toast({
            title: "User Already in group!",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
          toast({
            title: "Only admins can add someone!",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }

        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/api/chat/groupadd`,
            {
              chatId: selectedChat._id,
              userId: user1._id,
            },
            config
          );

          setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setLoading(false);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
        setGroupChatName("");
    };
    
    const handleRename = async () => {
        if (!groupChatName) return;

        try {
          setRenameLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.put(
            `/api/chat/rename`,
            {
              chatId: selectedChat._id,
              chatName: groupChatName,
            },
            config
          );

          console.log(data._id);
          setSelectedChat(data);
          setFetchAgain(!fetchAgain);
          setRenameLoading(false);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setRenameLoading(false);
        }
        setGroupChatName("");
    }
    
    const handleSearch = async (query) => {
        setSearch(query);
        setSearchResult([]);
        setLoading(false);
    
        if (!query) {
          try {
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.get(`/api/user?limit=20`, config);
            setLoading(false);
            setSearchResult(data);
          } catch (error) {
            setLoading(false);
          }
          return;
        }
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(async () => {
          try {
            setLoading(true);
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.get(`/api/user?search=${query}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
          } catch (error) {
            setLoading(false);
            setSearchResult([]);
            toast({
              title: "Error Occured",
              description: "Failed to load search results",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
        }, 300);
    };

    // Filter out users already in the group
    const filteredSearchResults = searchResult.filter(
        (searchUser) => !selectedChat.users.find((groupUser) => groupUser._id === searchUser._id)
    );
    
  return (
    <>
      
      <IconButton 
        display={{ base: "flex" }} 
        icon={<ViewIcon />} 
        onClick={onOpen}
        variant="solid"
        bg="gray.700"
        color="white"
        size="sm"
        _hover={{
          bg: "teal.500",
          transform: "scale(1.05)"
        }}
        _active={{
          bg: "teal.600"
        }}
        transition="all 0.2s"
        aria-label="View Group Details"
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent 
          mx={4} 
          maxH="90vh" 
          bg="gray.800" 
          color="white"
          border="1px solid"
          borderColor="gray.600"
        >
          <ModalHeader
            fontSize="28px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            pb={2}
            borderBottom="1px solid"
            borderColor="gray.600"
            color="teal.300"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton color="gray.300" _hover={{ color: "white" }} />
          
          <ModalBody py={4} overflow="hidden">
            {/* CURRENT GROUP MEMBERS */}
            <Box mb={4}>
              <Box 
                fontSize="sm" 
                fontWeight="semibold" 
                color="gray.300" 
                mb={2}
              >
                Group Members ({selectedChat.users.length})
              </Box>
              <Box 
                width="100%" 
                display="flex" 
                flexWrap="wrap" 
                gap={2}
                maxH="120px"
                overflowY="auto"
                p={2}
                border="1px solid"
                borderColor="gray.600"
                borderRadius="md"
                bg="gray.700"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#2D3748',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#4A5568',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#718096',
                  },
                }}
              >
                {selectedChat.users.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleRemove(u)}
                  />
                ))}
              </Box>
            </Box>

            
            <Box mb={4}>
              <Box 
                fontSize="sm" 
                fontWeight="semibold" 
                color="gray.300" 
                mb={2}
              >
                Rename Group
              </Box>
              <FormControl display="flex" gap={2}>
                <Input
                  placeholder="Enter new group name"
                  value={groupChatName || ""}
                  onChange={(e) => setGroupChatName(e.target.value)}
                  bg="gray.700"
                  border="1px solid"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 1px #4FD1C7"
                  }}
                />
                <Button 
                  variant="solid" 
                  colorScheme="teal" 
                  onClick={handleRename} 
                  isLoading={renameLoading}
                  minW="80px"
                  _hover={{
                    transform: "translateY(-1px)",
                    boxShadow: "lg"
                  }}
                  transition="all 0.2s"
                >
                  Update
                </Button>
              </FormControl>
            </Box>

            {/* ADD USERS SECTION */}
            <Box>
              <Box 
                fontSize="sm" 
                fontWeight="semibold" 
                color="gray.300" 
                mb={2}
              >
                Add Users to Group
              </Box>
              <FormControl mb={3}>
                <Input
                  placeholder="Search users to add..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  bg="gray.700"
                  border="1px solid"
                  borderColor="gray.600"
                  color="white"
                  _placeholder={{ color: "gray.400" }}
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 1px #4FD1C7"
                  }}
                />
              </FormControl>

              
              <Box
                maxH="200px"
                overflowY="auto"
                border="1px solid"
                borderColor="gray.600"
                borderRadius="md"
                bg="gray.700"
                p={2}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#2D3748',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#4A5568',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#718096',
                  },
                }}
              >
                {loading ? (
                  <Box 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    py={8}
                  >
                    <Spinner size="lg" color="teal.400" />
                  </Box>
                ) : (
                  <>
                    {filteredSearchResults.length === 0 ? (
                      <Box 
                        textAlign="center" 
                        py={4} 
                        color="gray.400"
                        fontSize="sm"
                      >
                        {search ? 
                          (searchResult.length === 0 ? "No users found" : "User already added") 
                          : "Start typing to search users..."
                        }
                      </Box>
                    ) : (
                      <Box>
                        {filteredSearchResults.map((user, index) => (
                          <Box key={user._id} mb={index === filteredSearchResults.length - 1 ? 0 : 1}>
                            <UserListItem
                              user={user}
                              handleFunction={() => handleAddUser(user)}
                            />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter borderTop="1px solid" borderColor="gray.600" pt={4}>
            <Button 
              colorScheme="red" 
              onClick={() => handleRemove(user)}
              _hover={{
                transform: "translateY(-1px)",
                boxShadow: "lg"
              }}
              transition="all 0.2s"
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
