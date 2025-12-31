import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import {RefreshToken} from "../models/RefreshToken.js"
import { generateAccessTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; 


export const protectRoutes = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    const refreshTokenCookie = req.cookies.refresh_token;

    try {
       
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId);
            if (!user) return res.status(401).json({ message: "User not found" });
            req.user = user;
            return next();
       
    } catch (err) {
        // Access token expired → call refresh token logic
        try {
            const userId = await handleRefreshToken(refreshTokenCookie, res);
            console.log("in refresh token")
            const user = await User.findById(userId);
            if (!user) return res.status(401).json({ message: "User not found" });
            req.user = user;
            return next();
        } catch (refreshError) {
            console.log("Refresh token error:", refreshError);
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
};


export const handleRefreshToken = async (refreshTokenCookie, res) => {
    if (!refreshTokenCookie) throw new Error("No refresh token provided");

    const decoded = jwt.verify(refreshTokenCookie, process.env.REFRESH_TOKEN_SECRET);

    const storedRefreshToken = await RefreshToken.findOne({ user: decoded.userId });
    if (!storedRefreshToken) throw new Error("No refresh token found");

    const result = await bcrypt.compare(refreshTokenCookie, storedRefreshToken.token);
    if (!result) throw new Error("Refresh token is invalid");

    
    generateAccessTokenAndSetCookie(decoded.userId, res);

    return decoded.userId;
};