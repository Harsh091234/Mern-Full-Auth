import express from "express"
import { connectDB } from "./db/connectDB.js";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const __dirname = path.resolve()
const PORT = process.env.PORT || 3000;


app.use("/api/auth", authRoutes)


if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
    })
}



app.listen(PORT, () => {
    connectDB();
    console.log(`server started at port:${PORT}`)
});
