import express from 'express';
import { PrismaClient } from '@prisma/client';
import UserRouter from './Router/UserRouter.js';
import cors from 'cors';
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
const router = UserRouter
const app = express();
app.use( "/",router);
const port = 3000
app.use(express.json());
app.use(cors());
// first test api 
app.get('/test', (req, res) => {
    res.send('Hello World!')
})

app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`)
})