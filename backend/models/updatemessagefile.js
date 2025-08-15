const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        readAt: { type: Date, default: Date.now },
      },
    ],
    // Add message type and file data
    messageType: {
      type: String,
      enum: ['text', 'file', 'image', 'video', 'audio'],
      default: 'text'
    },
    fileData: {
      filename: String,
      originalName: String,
      mimetype: String,
      size: Number,
      path: String
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;