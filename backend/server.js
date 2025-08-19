import express from "express"
import dotenv from "dotenv"
import chats from "./data/data.js"
import connectDB from "./config/db.js"
import chalk from "chalk"
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"
import messageRoutes from "./routes/messageRoutes.js"
import { Server } from "socket.io"

dotenv.config()
connectDB()
const app = express()
//we are taking data from frontend therefore we need to tell server to accept json data
app.use(express.json())

app.get("/",(req,res) => {
    res.send("hello")
})
//test routes

// app.get("/api/chat", (req,res) => {
//     res.send(chats)
// })
// app.get("/api/chat/:id", (req,res) => {
//     const singleChat = chats.find((c) => c._id === req.params.id)
//     res.send(singleChat) 
// })

app.use("/api/user", userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message', messageRoutes)

const PORT = process.env.PORT || 3000
//error handling functions to handle false routes or middleware
app.use(notFound)
app.use(errorHandler)

const server = app.listen(PORT,() => {
    console.log(chalk.yellow.bold(`Server is running at port ${PORT}`));
})
const io = new Server(server, {
    pingTimeout: 60000, //if no user response then closes connection to save bandwidth
    cors: {
        origin: "http://localhost:5173",
        
    },
})
io.on("connection", (socket) => {
    console.log(chalk.green.bold("New client connected"));
    socket.on('setup', (userData) => {
        socket.join(userData._id)
        socket.emit("connected")
    })
    socket.on("join chat", (room) => {
        socket.join(room)
        console.log("User joined room"+room)
    })
    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat
        if (!chat.users) return console.log("No chat.users found")
        chat.users.forEach((user) => {
           if(user._id === newMessageReceived.sender._id) return;
           socket.in(user._id).emit("message received", newMessageReceived)
        })
    })
    socket.on("typing", (room) => {
        socket.in(room).emit("typing")
    })
    socket.on("stop typing", (room) => {
        socket.in(room).emit("stop typing")
    })
    // socket.on("disconnect", () => {
    //     console.log(chalk.red.bold("Client disconnected"));
    // });
});





//for file upload
// Add this line with other route imports
// const fileRoutes = require('./routes/fileRoutes');

// // Add this line with other route uses
// app.use('/api/file', fileRoutes);

// // Add static file serving for uploads
// const path = require('path');
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));