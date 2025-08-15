import { ViewIcon } from '@chakra-ui/icons'
import { IconButton, useDisclosure, useToast } from '@chakra-ui/react'
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

const UpdateGroupChatModal = ({fetchAgain,setFetchAgain}) => {
    const {isOpen,onOpen,onClose} = useDisclosure()
    const [groupChatName,setGroupChatName] = useState()
    const [search,setSearch] = useState("")
    const [searchResult,setSearchResult] = useState([])
    const [loading,setLoading] = useState(false)
    const [renameLoading,setRenameLoading] = useState(false)
    const {selectedChat,setSelectedChat,user} = ChatState()
    const toast = useToast()
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
            <Box>
                {selectedChat.users.map((u) => (
                  <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                ))}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
