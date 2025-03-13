import express from 'express';
import { registerUser, verifyUser, logInUser } from '../controller/user.controller.js';

const route = express.Router();

route.post('/register', registerUser)
route.get('/verify/:token', verifyUser)
route.post('/login', logInUser)

export default route;