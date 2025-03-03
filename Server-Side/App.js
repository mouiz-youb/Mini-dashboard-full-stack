import express from 'express';
import { PrismaClient } from '@prisma/client';
import UserRouter from './Router/UserRouter.js';
import cors from 'cors';
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
const router = UserRouter
const app = express();
app.use( "/api/user",router);
const port = 3000
app.use(express.json());
app.use(cors());
// first test api 
app.get('/test', (req, res) => {
    res.send('Hello World!')
})
//⁡⁣⁣⁡⁣⁣⁢ ---------------------⁡
const CreateUser = async (req, res) => {
const { name, email } = req.body
try {
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Please provide email"})
        }
        // Check if user already exists
        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
    if(userExists){
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email
        }
    })
    res.status(201).json({
        success: true,
        data: user
    })
} catch (e) {
    console.error(e); // Log the error for debugging
    res.status(500).json({
        success: false,
        message: "Error creating user"
    });
}
 finally {
    await prisma.$disconnect()
}
}
app.post('/createuser', CreateUser)
// const Main = async ()=>{
// const user  =await prisma.user.create({
//     data:{
//         name:"Lhous",
//         email:"a_lhous@estin.dz"
//     }
// }
// )
// console.log(user)
// }
// Main().catch(e=>{
//     console.log(e.message)
// }).finally(async()=>{
//     await prisma.$disconnect()
// })
//⁡⁣⁣⁢ ---------------------⁡
app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`)
})