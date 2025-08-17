import express from "express"
import dotenv from "dotenv"
import chats from "./data/data.js"
import connectDB from "./config/db.js"
import chalk from "chalk"
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"
import messageRoutes from "./routes/messageRoutes.js"

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

app.listen(PORT,() => {
    console.log(chalk.yellow.bold(`Server is running at port ${PORT}`));
})









//for file upload
// Add this line with other route imports
// const fileRoutes = require('./routes/fileRoutes');

// // Add this line with other route uses
// app.use('/api/file', fileRoutes);

// // Add static file serving for uploads
// const path = require('path');
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));