import { PrismaClient } from "@prisma/client";
import { db } from "../Lib/Db.js";

const prisma = db;

const CreatePost = async (req, res) => {
    console.log('Request Body:', req.body);
    const {title , content ,userId }  = req.body
    try {
        if(!title ||!content ||!userId){
            return res.status(400).json({
                success:false,
                message:"Please provide title and content"
            })
        }
        const post = await prisma.post.create({
            data:{
                title:title,
                content:content,
                user: {
                    connect: { id: Number(userId) }
                }
            }
        })
        res.status(201).json({
            success:true,
            data:post
        })
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({
            success: false,
            message: "Error creating post",
            error: error.message
        });
    }
}
const GetAllPost = async (req, res) => {
    try {
        const Allpost = await prisma.post.findMany()
        if(!Allpost){
            return res.status(400).json({
                success:false,
                message:"No post found"
            })
        }
        res.status(200).json({
            success:true,
            data:Allpost
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error getting post"
        })
    }
}
const GetFisrt = async (req, res) => {
    try {
        const FirstPost = await prisma.post.findFirst()
        if(!FirstPost){
            return res.status(400).json({
                success:false,
                message:"The first post not found"
            })
        }
        res.status(200).json({
            success:true,
            data:FirstPost
        })
    } catch (error) {
        return res.status(500).json({
            seccess:false,
            message:"Error getting the first post"
        })
    }
}
const GetPostById = async (req, res) => {
    const {id }= req.params 
    try {
        const post = await prisma.post.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!post){
            return res.status(400).json({
                success:false,
                message:"The post that have this id not found "
            })
        }
        res.status(200).json({
            seccess:true,
            data:post
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error getting the post that have this id "
        })
    }
}
const UpdatePost = async (req, res) => {
    const {id}= req.params 
    const {title,content}= req.body
    try {
        const postExists = await prisma.post.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!postExists ){
            return res.status(400).json({
                success:false,
                message:"The post that have this id not found"
            })
        }
        const post = await prisma.post.update({
            where:{
                id:Number(id)
            },
            data:{
                title:title,
                content:content
            }
        })
        res.status(200).json({
            success:true,
            data:post
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error updating post"
        })
    }
}
const DeletePost = async (req, res) => {
const {id}= req.params 
try {
    const postExists = await prisma.post.findUnique({
        where:{
            id:Number(id)
        }
    })
    if(!postExists ){
        return res.status(400).json({
            success:false,
            message:"The post that have this id not found"
        })
    }
    const DeletePost = await prisma.post.delete({
        where:{
            id:Number(id)
        }
    })
    res.status(200).json({
        success:true,
        data:DeletePost
    })
} catch (error) {
    return res.status(500).json({
        seccess:false,
        message:"Error deleting post"
    })
}
}
export default { CreatePost, GetAllPost, GetFisrt, GetPostById, UpdatePost, DeletePost }