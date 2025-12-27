import jwt from "jsonwebtoken";
import { RefreshToken } from "../models/RefreshToken.js";


export const generateAccessTokenAndSetCookie = (userId, res) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5m", 
    });

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 5 * 60 * 1000, // 5 min
    });

    return accessToken;
};

export const generateRefreshTokenAndSetCookie =  (userId, res) => {
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "15m", 
    });


    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000, // 15 min
    });

   return refreshToken;
};