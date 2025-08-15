import React, { useState, useRef } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    VStack,
    HStack,
    Text,
    Box,
    Progress,
    Icon,
    useToast,
    Divider
} from '@chakra-ui/react';
import { AttachmentIcon, CheckIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';

const FileUploadModal = ({ isOpen, onClose, selectedChat, onFileUploaded }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef();
    const toast = useToast();
    const { user } = ChatState();

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Please select a file smaller than 10MB",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('chatId', selectedChat._id);

        try {
            setUploading(true);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                }
            };

            const { data } = await axios.post('/api/file/upload', formData, config);
            
            toast({
                title: "File uploaded successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            onFileUploaded(data);
            handleClose();
        } catch (error) {
            toast({
                title: "Upload failed",
                description: error.response?.data?.message || "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const handleClose = () => {
        setSelectedFile(null);
        setUploadProgress(0);
        setUploading(false);
        onClose();
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (type) => {
        if (type.startsWith('image/')) return '🖼️';
        if (type.startsWith('video/')) return '🎥';
        if (type.startsWith('audio/')) return '🎵';
        if (type.includes('pdf')) return '📄';
        if (type.includes('word')) return '📝';
        return '📎';
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="md">
            <ModalOverlay bg="blackAlpha.600" />
            <ModalContent bg="#1A202C" color="white" border="1px solid #2D3748">
                <ModalHeader
                    fontSize="20px"
                    fontFamily="Work sans"
                    color="#00BCD4"
                    borderBottom="1px solid #2D3748"
                >
                    Upload File
                </ModalHeader>
                <ModalCloseButton color="#00BCD4" />
                
                <ModalBody py={6}>
                    <VStack spacing={4}>
                        {!selectedFile ? (
                            <>
                                <Box
                                    border="2px dashed #4A5568"
                                    borderRadius="md"
                                    p={8}
                                    textAlign="center"
                                    cursor="pointer"
                                    _hover={{ borderColor: "#00BCD4" }}
                                    onClick={() => fileInputRef.current?.click()}
                                    w="100%"
                                >
                                    <Icon as={AttachmentIcon} w={8} h={8} color="#00BCD4" mb={2} />
                                    <Text>Click to select a file</Text>
                                    <Text fontSize="sm" color="#A0AEC0" mt={1}>
                                        Max size: 10MB
                                    </Text>
                                </Box>
                                
                                <Text fontSize="sm" color="#A0AEC0" textAlign="center">
                                    Supported formats: Images, Videos, Audio, PDF, Documents
                                </Text>
                            </>
                        ) : (
                            <Box w="100%" p={4} border="1px solid #4A5568" borderRadius="md">
                                <HStack spacing={3}>
                                    <Text fontSize="2xl">{getFileIcon(selectedFile.type)}</Text>
                                    <VStack align="start" spacing={1} flex={1}>
                                        <Text fontWeight="bold" noOfLines={1}>
                                            {selectedFile.name}
                                        </Text>
                                        <Text fontSize="sm" color="#A0AEC0">
                                            {formatFileSize(selectedFile.size)}
                                        </Text>
                                    </VStack>
                                    {!uploading && (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            color="#FF6B6B"
                                            onClick={() => setSelectedFile(null)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </HStack>
                                
                                {uploading && (
                                    <>
                                        <Divider my={3} />
                                        <VStack spacing={2}>
                                            <Progress 
                                                value={uploadProgress} 
                                                w="100%" 
                                                colorScheme="cyan" 
                                                borderRadius="md"
                                            />
                                            <Text fontSize="sm" color="#A0AEC0">
                                                {uploadProgress}% uploaded
                                            </Text>
                                        </VStack>
                                    </>
                                )}
                            </Box>
                        )}
                        
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter borderTop="1px solid #2D3748">
                    <HStack spacing={3}>
                        <Button variant="ghost" onClick={handleClose} disabled={uploading}>
                            Cancel
                        </Button>
                        <Button
                            bg="#00BCD4"
                            color="#1A202C"
                            _hover={{ bg: "#00ACC1" }}
                            onClick={handleUpload}
                            disabled={!selectedFile || uploading}
                            leftIcon={uploading ? undefined : <Icon as={CheckIcon} />}
                            loadingText="Uploading..."
                            isLoading={uploading}
                        >
                            Upload File
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default FileUploadModal;