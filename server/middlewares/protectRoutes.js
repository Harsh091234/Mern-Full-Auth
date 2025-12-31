import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protectRoutes = async(req, res, next) => {
    const accessToken = req.cookies.access_token;
   
    if(!accessToken) return res.status(401).json({success: false, message: "Unauthorized - no token provided"});
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findOne({_id: decoded.userId});
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

            req.user = user;
            next();
        
    } catch (error) {
        console.log("error in verifytoken", error);
        return res.status(500).json({success: false, message: "server error"});
    }
}