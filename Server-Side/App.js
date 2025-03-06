import express from 'express';
import { PrismaClient } from '@prisma/client';
import UserRouter from './Router/UserRouter.js';
import PostRouter from './Router/PostRouter.js';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./Lib/Auth.js";

const prisma = new PrismaClient();
prisma.$connect()
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.error("Error connecting to the database:", error));

// use `prisma` in your application to read and write data in your DB
const userRouter = UserRouter;
const postRouter = PostRouter;

const app = express();
const port = 3000;

// Middleware 
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.all("/api/auth/*", toNodeHandler(auth));

// Routes
app.use("/", userRouter);
app.use("/post", postRouter);

// First test API 
app.get('/test', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});