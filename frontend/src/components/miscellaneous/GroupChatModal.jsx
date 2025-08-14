// import { FormControl, Input, useDisclosure, useToast } from '@chakra-ui/react'
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button
// } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import { ChatState } from '../../Context/ChatProvider'
// import axios from 'axios'

// const GroupChatModal = ({children}) => {
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     const [groupChatName, setGroupChatName] = useState()
//     const [selectedUsers, setSelectedUsers] = useState([])
//     const [search, setSearch] = useState("")
//     const [searchResult, setSearchResult] = useState([])
//     const [loading, setLoading] = useState(false)
//     const toast = useToast()
//     const {user,chats,setChats} = ChatState()
//     const handleSearch = async (query) => {
//         setSearch(query)
//         setSearchResult([])
//         if(!query){
            
//             return
//         }
//         // added debouncing to prevent multiple api cvalls very important fix
//         clearTimeout(window.searchTimeout)
//         window.searchTimeout = setTimeout(async () => {
//         try {
//             setLoading(true)
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${user.token}`,
//                     // 'Cache-Control': 'no-cache'
//                 },
//             }
//             // use query instead of search
//             const {data} = await axios.get(`/api/user?search=${query}`, config)
//             console.log(data)
//             setLoading(false)
//             setSearchResult(data)
//         } catch (error) {
//             setLoading(false)
//             setSearchResult([])
//             toast({
//                 title: "Error Occured",
//                 description: "Failed to load search results",
//                 status: "error",
//                 duration: 2000,
//                 isClosable: true,
//             })
//         }
//     },300)
//     }
//     const handleSubmit = () => {}
//     return (
//     <>
//       {/* button will automatic render because children provided */}
//       <span onClick={onOpen}>{children}</span>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader
//            fontSize="35px"
//            fontFamily="Work sans"
//            display="flex"
//            justifyContent="center"
           
//           >
//             Create Group Chat
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody
//             display="flex"
//             flexDir="column"
//             alignItems="center"

//           >
//             <FormControl>
//                 <Input placeholder='Chat Name' mb={3} onChange={(e) => setGroupChatName(e.target.value)}/>
//             </FormControl>
//             <FormControl>
//                 <Input placeholder='Add Users eg: John, King, Abc' mb={1} onChange={(e) => handleSearch(e.target.value)}/>
//             </FormControl>
//             {/* list of selected users */}
//             {/* render search users */}
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme='blue' onClick={handleSubmit}>
//               Create Chat
//             </Button>
            
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   )
  
// }

// export default GroupChatModal


import { 
  FormControl, 
  Input, 
  useDisclosure, 
  useToast,
  Box,
  Text,
  Badge,
  Stack,
  Spinner
} from '@chakra-ui/react'
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
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const {user,chats,setChats} = ChatState()

    const handleSearch = async (query) => {
        setSearch(query)
        setSearchResult([])
        if(!query){
            return
        }
        clearTimeout(window.searchTimeout)
        window.searchTimeout = setTimeout(async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
            const {data} = await axios.get(`/api/user?search=${query}`, config)
            console.log(data)
            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            setLoading(false)
            setSearchResult([])
            toast({
                title: "Error Occured",
                description: "Failed to load search results",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
    },300)
    }

    const handleSubmit = () => {}

    return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent
          bg="#1A202C"
          color="white"
          border="1px solid"
          borderColor="#2D3748"
        >
          <ModalHeader
           fontSize="28px"
           fontFamily="Work sans"
           display="flex"
           justifyContent="center"
           color="#00BCD4"
           borderBottom="1px solid #2D3748"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton color="#00BCD4" />
          
          <ModalBody py={6}>
            <Stack spacing={4}>
              <FormControl>
                <Input 
                  placeholder='Chat Name' 
                  bg="#2D3748"
                  border="1px solid #4A5568"
                  color="white"
                  _placeholder={{ color: "#A0AEC0" }}
                  _focus={{ borderColor: "#00BCD4" }}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <Input 
                  placeholder='Add Users eg: John, King, Abc' 
                  bg="#2D3748"
                  border="1px solid #4A5568"
                  color="white"
                  _placeholder={{ color: "#A0AEC0" }}
                  _focus={{ borderColor: "#00BCD4" }}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>

              {/* Selected Users Display */}
              {selectedUsers.length > 0 && (
                <Box>
                  <Text mb={2} color="#A0AEC0" fontSize="sm">
                    Selected Users:
                  </Text>
                  <Stack direction="row" wrap="wrap" spacing={2}>
                    {selectedUsers.map(u => (
                      <Badge
                        key={u._id}
                        bg="#00BCD4"
                        color="#1A202C"
                        px={2}
                        py={1}
                        borderRadius="lg"
                        fontSize="xs"
                        cursor="pointer"
                        _hover={{ bg: "#E53E3E", color: "white" }}
                      >
                        {u.name} ✕
                      </Badge>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Search Results Display */}
              <Box>
                {loading ? (
                  <Box display="flex" justifyContent="center" py={4}>
                    <Spinner color="#00BCD4" />
                  </Box>
                ) : searchResult.length > 0 ? (
                  <Box maxH="200px" overflowY="auto">
                    {searchResult.slice(0, 4).map(user => (
                      <UserListItem 
                        key={user._id} 
                        user={user}
                        handleFunction={() => {}} 
                      />
                    ))}
                  </Box>
                ) : search && !loading ? (
                  <Text color="#A0AEC0" fontSize="sm" textAlign="center">
                    No users found
                  </Text>
                ) : null}
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter borderTop="1px solid #2D3748">
            <Button 
              bg="#00BCD4"
              color="#1A202C"
              _hover={{ bg: "#00ACC1" }}
              onClick={handleSubmit}
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal