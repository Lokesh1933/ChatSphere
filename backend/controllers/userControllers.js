import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../config/generateToken.js"
const registerUser =asyncHandler(async (req,res) => {
    const {name, email, password, pic} =req.body

    console.log("📥 Incoming register request:", { name, email, password, pic });

    if(!name || !email || !password){
        console.log("❌ Missing fields in request");
        res.status(400)
        throw new Error("Please Enter All the Fields")
    }

    const userExists = await User.findOne({email})
    if(userExists){
        console.log("❗ User already exists:", email);
        res.status(400)
        throw new Error("User already exists")
    }
    //crete a new User
    console.log("📦 Creating new user...");
    const user = await User.create({
        name,
        email,
        password,
        pic
    })
    //when registering user create a jwt token to be also sent

    if(user) {
        console.log("✅ User created:", user);
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id)
        })
    } else {
        console.log("❌ Failed to create user");
        res.status(400)
        throw new Error("Failed to Create the User")
    }
})

const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body
    const user  = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name: user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error("Invalid Email or Password")
    }
})
export {registerUser, authUser}