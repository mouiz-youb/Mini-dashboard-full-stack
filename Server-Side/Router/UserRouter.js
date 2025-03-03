import express from 'express';
import UserConroller from '../Controllers/UserConroller.js';
const {CreateUser,GetAllUsers,GetFisrt,GetUserById,UpdateUser,DeleteUser} = UserConroller;
const router = express.Router();
// the first test api
router.post('/createuser', CreateUser)
router.get('/users',GetAllUsers)
router.get('/user',GetFisrt)
router.get('/user/:id',GetUserById)
router.put('/user/:id',UpdateUser)
router.delete('/user/:id',DeleteUser)
export default router;