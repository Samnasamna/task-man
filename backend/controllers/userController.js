const asyncHandler = require("express-async-handler")
const User = require("../models/userModel.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//@desc User profile registration
//@route POST /api/v1/auth/register
//@access public

const registerUser = asyncHandler( async (req, res)=>{
    const {name, email, password, picture} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields should be filled.")
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400)
        throw new Error("User already exist")
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        ...req.body,
        password:hashedPassword
    })
    if(newUser && (await bcrypt.compare(password, newUser.password))){
        const accessToken = jwt.sign({
            user:{
                name:newUser.name,
                email:newUser.email,
                id:newUser.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"30m"});
        res.status(200).json({message:"token generated! :)", token:accessToken})
    }
})

//@desc User login
//@route POST /api/v1/auth/login
//@access public

const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required!")
    }

    const user = await User.findOne({email}).select("+password");

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                name:user.name,
                email:user.email,
                id:user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"30m"});
        res.status(200).json({message:"token generated! :)", token:accessToken})
    }else{
        res.status(400)
        throw new Error("Authentication failed!... check your credentials")
    }
})

//@desc current user details
//@route GET /api/v1/auth/current
//@access private

const currentUser = asyncHandler(async(req, res)=>{
    const {email} = req.user;
    const user = await User.findOne({email});
    res.status(200).json(user);
})

//@desc update profile
//@route PUT /api/v1/auth/current
//@access private

const currentUserUpdate = asyncHandler(async(req, res)=>{
    const {email} = req.user
    const user = await User.findOne({email})

    if(!user){
        res.status(403)
        throw new Error("unauthorized access")
    }
    const updatedProfile = await User.findByIdAndUpdate(
        req.user.id,
        req.body
    )
    res.status(200).json(updatedProfile)
})

module.exports = {registerUser, loginUser, currentUser, currentUserUpdate}