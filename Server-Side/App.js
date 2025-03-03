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
const GetAllUsers = async(req,res)=>{
    try {
        const users = await prisma.user.findMany(
        )
        if(!users){
            return res.status(400).json({
                success:false,
                message:"No users found"
            })
        }
        res.status(200).json({
            success:true,
            data:users
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Error getting users"
        })
    }
}
app.get('/users',GetAllUsers)
const GetFisrt =async(req,res)=>{
    try {
        const Firstuser = await prisma.user.findFirst()
        if(!Firstuser){
            return res.status(400).json({
                success:false,
                message:"No user found"
            })
        }
        res.status(200).json({
            success:true,
            data:Firstuser
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"Error getting users"
        })
    }
}
app.get('/user',GetFisrt)
const GetUserById = async(req,res)=>{
    try {
        const {id} =req.params
        const user = await prisma.user.findUnique({
            where:{
                id:Number(id)
            }
        }
        )
        if(!user){
            return res.status(400).json({
                success:false,
                message:"No user found"
            })
        }
        res.status(200).json({
            success:true,
            data:user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error getting user"
        })
    }
}
app.get('/user/:id',GetUserById)
const UpdateUser = async(req,res)=>{
    try {
        const {id} =req.params
        const {name ,email} = req.body
        // Check if user exists
        const userExists = await prisma.user.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!userExists){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const user = await prisma.user.update({
            where:{
                id:Number(id)
            },
            data:{
                name:name,
                email:email
            }
        })
        res.status(200).json({
            success:true,
            data:user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error updating user"
        })
    }
}
app.put('/user/:id',UpdateUser)
const DeleteUser = async(req,res)=>{
    try {
        const {id} =req.params
        // Check if user exists
        const userExists = await prisma.user.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!userExists){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        // Delete user
        const user = await prisma.user.delete({
            where:{
                id:Number(id)
            }
        })
        res.status(200).json({
            success:true,
            message:"User deleted"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error deleting user"
        })
    }
}
app.delete('/user/:id',DeleteUser)
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