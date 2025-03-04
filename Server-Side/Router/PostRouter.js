import express from 'express';
import PostControllers from '../Controllers/PostControllers.js';
const { CreatePost, GetAllPost, GetFisrt, GetPostById, UpdatePost, DeletePost} = PostControllers;
const router = express.Router();
router.post('/createPost', CreatePost)
router.get('/Allpost',GetAllPost)
router.get('/OnePost',GetFisrt)
router.get('/Post/:id',GetPostById)
router.put('/Post/:id',UpdatePost)
router.delete('/Deletepost/:id',DeletePost)
export default router;