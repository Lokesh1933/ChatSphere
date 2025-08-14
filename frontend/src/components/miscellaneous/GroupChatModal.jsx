import { FormControl, Input, useDisclosure, useToast } from '@chakra-ui/react'
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
        // added debouncing to prevent multiple api cvalls very important fix
        clearTimeout(window.searchTimeout)
        window.searchTimeout = setTimeout(async () => {
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    // 'Cache-Control': 'no-cache'
                },
            }
            // use query instead of search
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
      {/* button will automatic render because children provided */}
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
           fontSize="35px"
           fontFamily="Work sans"
           display="flex"
           justifyContent="center"
           
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"

          >
            <FormControl>
                <Input placeholder='Chat Name' mb={3} onChange={(e) => setGroupChatName(e.target.value)}/>
            </FormControl>
            <FormControl>
                <Input placeholder='Add Users eg: John, King, Abc' mb={1} onChange={(e) => handleSearch(e.target.value)}/>
            </FormControl>
            {/* list of selected users */}
            {/* render search users */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit}>
              Create Chat
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
  
}

export default GroupChatModal
