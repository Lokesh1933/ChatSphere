import asyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";
const accessChat = asyncHandler(async (req, res) => {
    //create or fetch one on one chat
    const { userId } = req.body;
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    //for one on one chat group chat is false
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password").populate("latestMessage");
    isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "name pic email", });
    if(isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        };
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
})

const fetchChats = asyncHandler(async (req, res) => {
    try {
        //  console.log("Current user ID:", req.user._id);
        let results =await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
        // console.log("Found chats:", results.length); // Debug log
        // console.log("Raw results:", JSON.stringify(results, null, 2)); 
        results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email"
        });
        // console.log("After population:", JSON.stringify(results, null, 2)); 
        res.status(200).send(results);
            
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const createGroupChat = asyncHandler(async (req, res) => {
    if(!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }
    //take all users from req.body
    var users = JSON.parse(req.body.users);
    //group should have more than 2 users
    if(users.length < 2) {
        return res.status(400).send("More than 2 users are required to form a group chat");
    }
    //current user with all other users is part of the group chat
    users.push(req.user)
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        });
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;
    if (!chatId || !chatName) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }
    try {
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        res.status(200).json(updatedChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }
    try {
        const added = await Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId },
        }, { new: true }) //return latest field
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        res.status(200).json(added);
    } catch (error) {
        res.status(400);
        throw new Error("chat not found");
    }
})

const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    if (!chatId || !userId) {
        return res.status(400).send({ message: "Please fill all the fields" });
    }
    try {
        const removed = await Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId },
        }, { new: true }) //return latest field
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        res.status(200).json(removed);
    } catch (error) {
        res.status(400);
        throw new Error("chat not found");
    }
})
export { accessChat, fetchChats , createGroupChat, renameGroup, addToGroup, removeFromGroup };