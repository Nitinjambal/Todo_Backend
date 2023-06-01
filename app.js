import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser";


export const app=express();

config({
    path:"./data/config.env",
})

//middlewares
app.use(express.json());
app.use(cookieParser());


//using routes
app.use("/api/v1/users",userRouter);







