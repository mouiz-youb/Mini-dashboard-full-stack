import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
const app = express();
const port = 3000
app.use(express.json());
// first test api 
app.get('/test', (req, res) => {
    res.send('Hello World!')
})
app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`)
})