const express = require('express');
const UserModel = require('../models/user.model');

const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post('/signup', async (req, res)=>{
    const{email, password, confirmPassword} = req.body;

    if(password != confirmPassword){
        return res.json({message:"Passwords do not match"})
    }

    const is_User = await UserModel.findOne({email: email});

    if(is_User){
        return res.json({message:'User already exists! Try Logging in again!' })
    }

    //hash the password
    bcrypt.hash(password,8,async(err, hash)=>{
        await UserModel.create({
            email: email,
            password: hash,
            confirmPassword: hash,
        })
        res.json({message:"User Signed in successfully"})
    })
})


userRouter.post('/login', async(req, res)=>{
    const{email, password }= req.body;

    const is_User = await UserModel.findOne({email:email});

    if(is_User){
        const hashed_password = is_User.password;
        bcrypt.compare(password,hashed_password,async(err,result)=>{
            if(result){
                const token = jwt.sign({
                    UserID: is_User._id
                }, "heyDev");

                return res.json({message: "Login Success", token: token});
            }
            else{
                return res.json({
                    message: "Invalid crediantials, Try Again!!"
                })
            }

        })
    }

    else{
        return res.json({message: "User not found!, Try Signing in again"})
    }
})

module.exports =userRouter;
