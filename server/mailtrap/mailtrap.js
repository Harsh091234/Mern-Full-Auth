import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

// Step 1: Create transporter using Gmail SMTP
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bot474827@gmail.com", // your Gmail address
    pass: process.env.APP_PASSWORD, // App Password from Google
  },
});


export const sender = {
  email: "bot474827@gmail.com",
  name: "test bot",
}
