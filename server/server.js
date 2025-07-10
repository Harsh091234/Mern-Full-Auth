import express from "express"
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("hello"));

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`server started at port:${PORT}`)
});
