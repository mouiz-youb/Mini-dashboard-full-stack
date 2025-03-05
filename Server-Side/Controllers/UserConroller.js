import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const CreateUser = async (req, res) => {
    const { name, email ,password } = req.body
    try {
        if (!email ||!password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"})
            }
            // Check if user already exists
            const userExists = await prisma.userX.findUnique({
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
        const user = await prisma.userX.create({
            data: {
                name: name,
                email: email,
                password: password
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
export default {CreateUser,GetAllUsers,GetFisrt,GetUserById,UpdateUser,DeleteUser}