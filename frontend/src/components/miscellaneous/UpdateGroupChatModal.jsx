import { ViewIcon } from '@chakra-ui/icons'
import { Box, FormControl, IconButton, Input, useDisclosure, useToast } from '@chakra-ui/react'
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

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
    const {isOpen,onOpen,onClose} = useDisclosure()
    const [groupChatName,setGroupChatName] = useState()
    const [search,setSearch] = useState("")
    const [searchResult,setSearchResult] = useState([])
    const [loading,setLoading] = useState(false)
    const [renameLoading,setRenameLoading] = useState(false)
    const {selectedChat,setSelectedChat,user} = ChatState()
    const toast = useToast()
    const handleRemove = () => {}
    const handleRename = () => {}
    const handleSearch = () => {}
  return (
    <>
      <IconButton display={{ base: "flex"}} icon={<ViewIcon/>} onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width="100%" display="flex" flexWrap="wrap" pb={3}>
                {selectedChat.users.map((u) => (
                  <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleRemove(u)}
                    />
                ))}
            </Box>
            <FormControl>
               <Input
                  placeholder='Chat Name'
                  mb={3}
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
               />
               <Button variant="solid" colorScheme='teal' ml={1} onClick={handleRename} isLoading={renameLoading}>Update</Button>
            </FormControl>
            <FormControl>
                <Input
                   placeholder='Add User to group'
                   mb={1}
                //    value={search}
                   onChange={(e) => handleSearch(e.target.value)}
               />
               <Button variant="solid" colorScheme='teal' ml={1} onClick={handleRename} isLoading={renameLoading}>Update</Button>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
