import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";

export const app = express();

config({
    path: "./data/config.env",
})

//middlewares
app.use(express.json());
app.use(cookieParser());

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

//using error middleware
app.use(errorMiddleWare)








