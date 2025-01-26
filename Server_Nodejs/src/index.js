import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import { connectDB } from './lib/db.js'
import { app, server } from './lib/socket.js';

dotenv.config();

app.use(cors(
    {
        origin: "http://localhost:3000", // Your frontend's origin
        credentials: true,              // Allow credentials (cookies, authorization headers)
    }
))

app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log("Server Is Running On Port: " + PORT);
    connectDB();
})