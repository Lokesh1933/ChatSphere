import React from 'react';
import {
    Box,
    HStack,
    VStack,
    Text,
    Button,
    Icon,
    useToast
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';

const FileMessage = ({ message, isOwnMessage }) => {
    const toast = useToast();
    const { user } = ChatState();

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (type) => {
        if (type?.startsWith('image/')) return '🖼️';
        if (type?.startsWith('video/')) return '🎥';
        if (type?.startsWith('audio/')) return '🎵';
        if (type?.includes('pdf')) return '📄';
        if (type?.includes('word')) return '📝';
        return '📎';
    };

    const handleDownload = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                responseType: 'blob'
            };

            const response = await axios.get(`/api/file/download/${message._id}`, config);
            
            // Create blob URL and trigger download
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = message.fileData.originalName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast({
                title: "Download started",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Download failed",
                description: error.response?.data?.message || "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            bg={isOwnMessage ? "#00BCD4" : "#2D3748"}
            color={isOwnMessage ? "#1A202C" : "white"}
            borderRadius="lg"
            p={3}
            maxW="300px"
            border="1px solid"
            borderColor={isOwnMessage ? "#00BCD4" : "#4A5568"}
        >
            <HStack spacing={3}>
                <Text fontSize="2xl">{getFileIcon(message.fileData?.mimetype)}</Text>
                <VStack align="start" spacing={1} flex={1}>
                    <Text fontWeight="bold" fontSize="sm" noOfLines={2}>
                        {message.fileData?.originalName || message.content}
                    </Text>
                    <Text fontSize="xs" opacity={0.8}>
                        {message.fileData?.size ? formatFileSize(message.fileData.size) : 'Unknown size'}
                    </Text>
                </VStack>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDownload}
                    color={isOwnMessage ? "#1A202C" : "#00BCD4"}
                    _hover={{ bg: isOwnMessage ? "rgba(26, 32, 44, 0.1)" : "rgba(0, 188, 212, 0.1)" }}
                >
                    <Icon as={DownloadIcon} />
                </Button>
            </HStack>
        </Box>
    );
};

export default FileMessage;