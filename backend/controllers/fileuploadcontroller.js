const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Define allowed file types
    const allowedTypes = {
        'image/jpeg': true,
        'image/jpg': true,
        'image/png': true,
        'image/gif': true,
        'application/pdf': true,
        'text/plain': true,
        'application/msword': true,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
        'video/mp4': true,
        'video/mpeg': true,
        'audio/mpeg': true,
        'audio/wav': true
    };

    if (allowedTypes[file.mimetype]) {
        cb(null, true);
    } else {
        cb(new Error('File type not allowed'), false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: fileFilter
});

// Upload file and create message
const uploadFile = async (req, res) => {
    try {
        const { chatId } = req.body;

        if (!chatId) {
            return res.status(400).json({ message: "Chat ID is required" });
        }

        // Verify chat exists and user is part of it
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        const isUserInChat = chat.users.some(userId => userId.toString() === req.user._id.toString());
        if (!isUserInChat) {
            return res.status(403).json({ message: "You are not authorized to send files to this chat" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Create file message
        const fileMessage = {
            sender: req.user._id,
            content: req.file.originalname,
            chat: chatId,
            messageType: 'file',
            fileData: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                path: req.file.path
            }
        };

        let message = await Message.create(fileMessage);
        message = await message.populate("sender", "name pic email");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        // Update chat's latest message
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Download file
const downloadFile = async (req, res) => {
    try {
        const { messageId } = req.params;

        const message = await Message.findById(messageId).populate('chat');
        if (!message || message.messageType !== 'file') {
            return res.status(404).json({ message: "File not found" });
        }

        // Check if user is part of the chat
        const isUserInChat = message.chat.users.some(userId => userId.toString() === req.user._id.toString());
        if (!isUserInChat) {
            return res.status(403).json({ message: "You are not authorized to download this file" });
        }

        const filePath = path.join(__dirname, '..', message.fileData.path);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found on server" });
        }

        res.download(filePath, message.fileData.originalName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get file info
const getFileInfo = async (req, res) => {
    try {
        const { messageId } = req.params;

        const message = await Message.findById(messageId).populate('chat');
        if (!message || message.messageType !== 'file') {
            return res.status(404).json({ message: "File not found" });
        }

        // Check if user is part of the chat
        const isUserInChat = message.chat.users.some(userId => userId.toString() === req.user._id.toString());
        if (!isUserInChat) {
            return res.status(403).json({ message: "You are not authorized to access this file" });
        }

        res.json({
            filename: message.fileData.filename,
            originalName: message.fileData.originalName,
            mimetype: message.fileData.mimetype,
            size: message.fileData.size,
            uploadedAt: message.createdAt,
            sender: message.sender
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { upload, uploadFile, downloadFile, getFileInfo };