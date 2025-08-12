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

export { accessChat, fetchChats }