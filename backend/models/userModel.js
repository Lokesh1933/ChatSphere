import mongoose from "mongoose";
import bcrypt from "bcryptjs";
//name
//email
//password
//picture
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);
//before saving do something we want to encrypt user password to be stored in databse and not in plain format
//next is a middleware
userSchema.pre('save',async function (next) {
  if(!this.modified) {
    next()
  }
  //before saving user tyo database encrypt the password
  const salt = await  bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})
const User = mongoose.model("User", userSchema);
export default User;
