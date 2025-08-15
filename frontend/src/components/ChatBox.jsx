import React from 'react'

const ChatBox = () => {
  return (
    <div>
      chat box
    </div>
  )
}

export default ChatBox














//for file sharing 
// In your ChatBox.jsx, import and use FileMessage
// import FileMessage from './FileUpload/FileMessage';

// // In your message rendering logic:
// {message.messageType === 'file' ? (
//     <FileMessage 
//         message={message} 
//         isOwnMessage={isSameSender(messages, message, i, user._id)}
//     />
// ) : (
//     // Your existing text message rendering
//     <Text>
//         {message.content}
//     </Text>
// )}
//--------------------------------------------------------------------

//add file upload button to chat input


// In your chat input area, add:
// import FileUploadModal from './FileUpload/FileUploadModal';
// import { useDisclosure } from '@chakra-ui/react';

// const { isOpen: isFileModalOpen, onOpen: onFileModalOpen, onClose: onFileModalClose } = useDisclosure();

// // Add upload button next to send button:
// <IconButton
//     icon={<AttachmentIcon />}
//     onClick={onFileModalOpen}
//     bg="transparent"
//     color="#00BCD4"
//     _hover={{ bg: "rgba(0, 188, 212, 0.1)" }}
// />

// // Add the modal:
// <FileUploadModal
//     isOpen={isFileModalOpen}
//     onClose={onFileModalClose}
//     selectedChat={selectedChat}
//     onFileUploaded={(newMessage) => {
//         // Add the new message to your messages state
//         setMessages([...messages, newMessage]);
//     }}
// />