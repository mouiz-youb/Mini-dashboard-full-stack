import express from 'express';
import UserConroller from '../Controllers/UserConroller.js';
const {CreateUser} = UserConroller;
const router = express.Router();
// the first test api
router.get('/createuser', CreateUser)
export default router;