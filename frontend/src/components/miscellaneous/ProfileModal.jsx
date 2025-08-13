// import { IconButton, useDisclosure,Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton, } from '@chakra-ui/react'

// import {  ViewIcon } from '@chakra-ui/icons'
// import React from 'react'

// const ProfileModal = ({user,children}) => {
// const { isOpen, onOpen, onClose } = useDisclosure()
//   return (
    
//     <>
//       {children?(<span onClick={onOpen}>{children}</span>):
//         (
//             <IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>
//         )
//       }
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Modal Title</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Lorem count={2} />
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme='blue' mr={3} onClick={onClose}>
//               Close
//             </Button>
//             <Button variant='ghost'>Secondary Action</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }

// export default ProfileModal

import { 
  IconButton, 
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  VStack,
  Flex,
  Icon
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import React from 'react'

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton 
          display={{ base: "flex" }} 
          icon={<ViewIcon />} 
          onClick={onOpen}
          variant="ghost"
          color="gray.300"
          _hover={{ color: "cyan.400", bg: "gray.700" }}
        />
      )}
      
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent 
          bg="gray.800" 
          borderColor="gray.600" 
          borderWidth="1px"
          fontFamily="'Fira Code', monospace"
          maxW="400px"
        >
          <ModalHeader 
            color="cyan.400"
            textAlign="center"
            borderBottom="1px solid"
            borderColor="gray.600"
            fontSize="xl"
          >
            <Flex align="center" justify="center" gap={2}>
              <Icon as={FaUser} />
              {"User Profile"}
            </Flex>
          </ModalHeader>
          
          <ModalCloseButton 
            color="gray.400" 
            _hover={{ color: "red.400" }}
          />
          
          <ModalBody py={6}>
            <VStack spacing={4}>
              <Image
                borderRadius="full"
                boxSize="120px"
                src={user?.pic}
                alt={user?.name}
                border="3px solid"
                borderColor="cyan.400"
                boxShadow="0 0 20px rgba(0, 255, 255, 0.3)"
              />
              
              <VStack spacing={2} align="center">
                <Text 
                  fontSize="2xl" 
                  fontWeight="bold" 
                  color="white"
                  textAlign="center"
                >
                  {user?.name}
                </Text>
                
                <Flex align="center" gap={2} color="gray.400">
                  <Icon as={FaEnvelope} />
                  <Text fontSize="md">
                    {user?.email}
                  </Text>
                </Flex>
              </VStack>
              
              {/* <Text 
                fontSize="sm" 
                color="gray.500" 
                textAlign="center"
                fontStyle="italic"
              > */}
                {"/*  Profile */"}
              {/* </Text> */}
            </VStack>
          </ModalBody>

          <ModalFooter 
            borderTop="1px solid" 
            borderColor="gray.600"
            justifyContent="center"
          >
            <Button 
              bg="cyan.500"
              color="white"
              _hover={{ 
                bg: "cyan.400",
                transform: "translateY(-1px)"
              }}
              onClick={onClose}
              fontFamily="'Fira Code', monospace"
            >
              {" Close "}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
