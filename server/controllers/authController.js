
import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/User.js";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";

export const signup = async(req, res) => {
    const {name, email, password} = req.body;
    try {
        if(!name || !password || !email) {
            throw new Error("all fields are required");
        }

        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists) {
            return res.status(400).json({success: false, message: "user already exists"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
          email,
          password: hashedPassword,
          name,
          verificationToken,
          verificationTokenExpiresAt: new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ),
        });

        await user.save();
        generateTokenAndSetCookie(user._id, res);
        await sendVerificationEmail(user.email, verificationToken);

        res.status(200).json({success: true, 
            message: "user created successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        });

    } catch (error) {
        return res.status(400).json({success: false, message: error.message});
    }
}

export const verifyEmail = async(req, res) => {
    const {code} = req.body;
    console.log("code",code);
    try {
        const user = await User.findOne({
          verificationToken: code,
          verificationTokenExpiresAt: { $gt: Date.now() },
        });
        console.log(`user: ${user}`)
        if(!user) 
        {
            return res.status(400).json({success: false, message: "invalid or expired token" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresdAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);

      res.status(200).json({
            success: true,
            message: "email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

}

export  const login = async(req, res) => {
    const {email, password} = req.body;
    console.log(email, password)
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success: false, message: "invalid credentials"});
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "invalid credentials"});
        }

        generateTokenAndSetCookie( user._id, res);
        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({success: true, message: "logged in successfully", user: {
            ...user._doc,
            password: undefined,
        }})
    } catch (error) {
        console.log("error: " ,error);
        res.status(400).json({success: false, message: error.message});
    }
}

export  const logout = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({success: true, message: "logout successful"})
}

export const forgotPassword = async(req, res) => {
    const {email} = req.body;
    
    try {
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({success: false, message: "user not found"});
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
       
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "password reset link sent to your email"});
    } catch (error) {
        console.log("Error in forgot password: ", error);
        res.status(400).json({sucess: false, message: error.message});
    }
}

export const resetPassword = async(req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: {$gt: Date.now()},
        })
       

        if(!user){
            return res.status(400).json({success: false, message: "invalid or expired reset token"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success: true, message: "password reset successful"});
    } catch (error) {
        console.log("error in reset password", error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const checkAuth = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user) {
            return res.status(400).json({success: false, message: "user not found"});
        }

        res.status(200).json({success: true, user});
    } catch (error) {
        console.log("error in check auth", error);
        res.status(400).json({success: false, message: error.message});
    }
}