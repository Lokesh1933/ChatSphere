import express from "express"
import dotenv from "dotenv"
import chats from "./data/data.js"
import connectDB from "./config/db.js"
import chalk from "chalk"
import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"

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

const PORT = process.env.PORT || 3000
//error handling functions to handle false routes or middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT,() => {
    console.log(chalk.yellow.bold(`Server is running at port ${PORT}`));
})