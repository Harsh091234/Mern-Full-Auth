import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import {RefreshToken} from "../models/RefreshToken.js"
import { generateAccessTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; 


export const protectRoutes = async (req, res, next) => {
    try {
        const accessToken = req.cookies.access_token;

        if (!accessToken) {
            return handleRefreshToken(req, res, next);
        }

        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (err) {
        return handleRefreshToken(req, res, next);
    }
};

export const handleRefreshToken = async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token;

    // 🔑 This is NOT an error condition
    if (!refreshToken) {
        return res.status(401).json({
            authenticated: false,
            message: "Not logged in",
        });
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const storedRefreshToken = await RefreshToken.findOne({
            user: decoded.userId,
        });

        if (!storedRefreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const isValid = await bcrypt.compare(
            refreshToken,
            storedRefreshToken.token
        );

        if (!isValid) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        generateAccessTokenAndSetCookie(decoded.userId, res);

        req.user = await User.findById(decoded.userId);
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Refresh token expired or invalid",
        });
    }
};
