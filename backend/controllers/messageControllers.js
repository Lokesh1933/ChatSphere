import expressAsyncHandler from "express-async-handler"
import Message from "../models/messageModel.js"
import User from "../models/userModel.js"
import Chat from "../models/chatModel.js"
const sendMessage = expressAsyncHandler(async (req, res) => {
    const { chatId, content } = req.body
    const user = req.user

    if (!chatId || !content) {
        res.status(400)
        throw new Error("Invalid data passed into request")
    }

    var newMessage = {
        sender: user._id,
        content:content,
        chat: chatId,
    }

    try{
       var message = await Message.create(newMessage)
       message = await message.populate("sender", "name pic")
       message = await message.populate("chat")
       message = await User.populate(message, {
           path: "chat.users",
           select: "name pic email",
       })
       await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message }, { new: true })
       res.status(201).json(message)
    }catch(error){
        res.status(400)
        throw new Error(error.message)
    }
})
export { sendMessage }