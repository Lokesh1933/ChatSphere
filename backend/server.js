import express from "express"
import dotenv from "dotenv"
import chats from "./data/data.js"
import connectDB from "./config/db.js"
import chalk from "chalk"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
connectDB()
const app = express()
//we are taking data from frontend therefore we need to tell server to accept json data
app.use(express.json())

app.get("/",(req,res) => {
    res.send("hello")
})

app.use('/api/user',userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(chalk.yellow.bold(`Server is running at port ${PORT}`));
})