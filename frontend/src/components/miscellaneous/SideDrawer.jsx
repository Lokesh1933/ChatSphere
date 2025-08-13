// import { Box, Button, Tooltip } from '@chakra-ui/react'
// import { FaSearch } from 'react-icons/fa'
// import React, { useState } from 'react'


// const SideDrawer = () => {
//   const [search,setSearch] = useState("")
//   const [searchResult,setSearchResult] = useState([])
//   const [loading,setLoading] = useState(false)
//   const [loadingChat,setLoadingChat] = useState()
//   return (
//     <>
//       <Box>
//         <Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
//             <Button></Button>
//         </Tooltip>
        
//       </Box>
//     </>
//   )
// }

// export default SideDrawer

import { 
  Box, 
  Button, 
  Tooltip, 
  Text, 
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Input,
  Flex,
  Spinner,
  useToast,
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Badge
} from '@chakra-ui/react'
import { FaSearch, FaBell, FaChevronDown, FaSignOutAlt, FaUser} from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { useHistory } from 'react-router-dom' 
import axios from 'axios'
import ProfileModal from './ProfileModal'
import ChatLoading from '../ChatLoading'

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  
  // Get notifications from ChatState and add history
  const { user, setSelectedChat, chats, setChats, notifications } = ChatState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const history = useHistory() 

  const handleSearch = async (searchTerm = search) => {
    if (!searchTerm.trim()) {
      if (searchTerm === search) { // Only show toast when manually clicking Go
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top-left",
      })
    }
      setSearchResult([])
      return
    }

    try {
      setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(`/api/user?search=${searchTerm}`, config)
      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      setLoading(false)
      setSearchResult([])
      toast({
        title: "Error Occurred!",
        description: "Failed to load the search results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }

  // Auto-search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.length > 0) {
        handleSearch(search)
      } else {
        setSearchResult([])
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [search])

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
      ///api/chat takes user id
      const { data } = await axios.post("/api/chat", { userId }, config)
      
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
      setSelectedChat(data)
      setLoadingChat(false)
      onClose()
    } catch (error) {
      setLoadingChat(false)
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }


  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    history.push("/")
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.800"
        w="100%"
        p={4}
        borderBottom="2px solid"
        borderColor="cyan.400"
        boxShadow="0 2px 10px rgba(0, 255, 255, 0.2)"
      >
        <Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
          <Button 
            variant="ghost" 
            onClick={onOpen}
            color="gray.300"
            fontFamily="'Fira Code', monospace"
            _hover={{ 
              color: "cyan.400", 
              bg: "gray.700",
              transform: "translateY(-1px)" 
            }}
            leftIcon={<Icon as={FaSearch} />}
          >
            <Text display={{ base: "none", md: "flex" }}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text
          fontSize="2xl"
          fontFamily="'Fira Code', monospace"
          color="white"
          fontWeight="bold"
        >
          Chat-Sphere
        </Text>

        <Flex align="center" gap={3}>
          {/* Notifications Menu */}
          <Menu>
            <MenuButton 
              as={IconButton} 
              variant="ghost" 
              color="gray.300" 
              position="relative"
              _hover={{ color: "orange.400", bg: "gray.700" }}
              aria-label="Notifications"
            >
              <Icon as={FaBell} />
              {notifications && notifications.length > 0 && (
                <Badge
                  colorScheme="red" 
                  position="absolute" 
                  top={0} 
                  right={0}
                  fontSize="xs"
                  borderRadius="full"
                >
                  {notifications.length}
                </Badge>
              )}
            </MenuButton>
            <MenuList 
              bg="gray.800" 
              borderColor="gray.600"
              fontFamily="'Fira Code', monospace"
            >
              {!notifications || notifications.length === 0 ? (
                <MenuItem 
                  bg="gray.800" 
                  color="gray.400"
                  _hover={{ bg: "gray.700" }}
                  isDisabled
                >
                  No new notifications
                </MenuItem>
              ) : (
                notifications.map((notification, index) => (
                  <MenuItem
                    key={index}
                    bg="gray.800"
                    color="gray.300"
                    _hover={{ bg: "gray.700", color: "cyan.400" }}
                  >
                    New message from {notification.sender?.name}
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Menu>

          {/* Profile Menu */}
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<Icon as={FaChevronDown} />}
              color="gray.300"
              fontFamily="'Fira Code', monospace"
              _hover={{ color: "cyan.400", bg: "gray.700" }}
              _active={{ bg: "gray.700" }}
            >
              <Flex align="center" gap={2}>
                <Avatar size="sm" name={user?.name} src={user?.pic} />
                <Text fontSize="sm">{user?.name}</Text>
              </Flex>
            </MenuButton>
            <MenuList 
              bg="gray.800" 
              borderColor="gray.600"
              fontFamily="'Fira Code', monospace"
            >
              <ProfileModal user={user}>
                
              <MenuItem
                bg="gray.800"
                color="gray.300"
                _hover={{ bg: "gray.700", color: "cyan.400" }}
                icon={<Icon as={FaUser} />}
              >
                My Profile
              </MenuItem>
              </ProfileModal>
              <MenuDivider borderColor="gray.600" />
              <MenuItem
                bg="gray.800"
                color="gray.300"
                _hover={{ bg: "gray.700", color: "red.400" }}
                icon={<Icon as={FaSignOutAlt} />}
                onClick={logoutHandler}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent 
          bg="gray.800" 
          borderRight="2px solid" 
          borderColor="cyan.400"
          // borderBottomWidth="1px"
        >
          <DrawerHeader
            color="cyan.400"
            fontFamily="'Fira Code', monospace"
            borderBottom="1px solid"
            borderColor="gray.600"
          >
            {"// Search Users"}
          </DrawerHeader>
          <DrawerBody>
            <Flex pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                fontFamily="'Fira Code', monospace"
                _focus={{ borderColor: "cyan.400" }}
                _placeholder={{ color: "gray.400" }}
              />
              <Button
                onClick={() => handleSearch()}
                bg="cyan.500"
                _hover={{ 
                  bg: "cyan.400",
                  transform: "translateY(-1px)"
                }}
                color="white"
                fontFamily="'Fira Code', monospace"
              >
                Go
              </Button>
            </Flex>
            
            {loading ? (
              // <Flex justify="center" mt={4}>
              //   <Spinner color="cyan.400" />
              // </Flex>
              <Flex 
                justify="center" 
                align="center" 
                direction="column"
                py={6}
                gap={3}
              >
               <Box position="relative">
                 <Spinner
                   thickness="3px"
                   emptyColor="gray.600"
                   speed="0.8s"
                   size="xl"
                   color="cyan.400"
                 />
                 <Icon 
                   as={FaSearch} 
                   top="50%"
                   left="50%"
                   transform="translate(-50%, -50%)"
                   color="cyan.400"
                   boxSize={4}
                   position="absolute"
                 />
               </Box>
    
               <Text 
                   color="gray.400" 
                   fontFamily="'Fira Code', monospace"
                   fontSize="sm"
                  textAlign="center"
               >
                {"Searching Users..."}
               </Text>
              </Flex>
              // <ChatLoading/>
            ) : (
              searchResult?.map((searchUser) => (
                <Box
                  key={searchUser._id}
                  onClick={() => accessChat(searchUser._id)}
                  cursor="pointer"
                  bg="gray.700"
                  _hover={{ 
                    bg: "gray.600",
                    transform: "translateX(4px)"
                  }}
                  w="100%"
                  display="flex"
                  alignItems="center"
                  color="white"
                  px={3}
                  py={2}
                  mb={2}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.600"
                  transition="all 0.2s"
                >
                  <Avatar
                    mr={2}
                    size="sm"
                    cursor="pointer"
                    name={searchUser.name}
                    src={searchUser.pic}
                  />
                  <Box fontFamily="'Fira Code', monospace">
                    <Text fontWeight="bold">{searchUser.name}</Text>
                    <Text fontSize="xs" color="gray.400">
                      <strong>Email:</strong> {searchUser.email}
                    </Text>
                  </Box>
                </Box>
              ))
            )}
            
            {loadingChat && (
              <Flex justify="center" mt={4}>
                <Spinner color="cyan.400" />
              </Flex>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer