import express from 'express';
import { PrismaClient } from '@prisma/client';
import UserRouter from './Router/UserRouter.js';
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
const router = UserRouter
const app = express();
app.use( "/api/user",router);
const port = 3000
app.use(express.json());
// first test api 
app.get('/test', (req, res) => {
    res.send('Hello World!')
})
// testing prisma 
const Main = async () => {
    const user = await prisma.User.create({
        data:{
            name:"AbdelMouiz",
            email:"abdelmouiz@gmail.com",
        }
    })
    res.send(user)
}
app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`)
})