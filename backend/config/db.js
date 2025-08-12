import mongoose from "mongoose";
import chalk from "chalk";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,//deperecated
      // useUnifiedTopology: true,
    });
    console.log(chalk.blue.underline.bold(`MongoDB connected: ${conn.connection.host}`));
  } catch (error) {
    console.log(chalk.red.bold(`Error: ${error.message}`));
    process.exit();
  }
};
export default connectDB;
