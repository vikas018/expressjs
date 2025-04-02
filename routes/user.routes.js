import express from 'express';
import { isLoggedIn } from '../middleware/auth.middleware.js'
import { registerUser, verifyUser, logInUser, profileUser } from '../controller/user.controller.js';

const route = express.Router();

route.post('/register', registerUser)
route.get('/verify/:token', verifyUser)
route.post('/login', logInUser)
route.get('/profile', isLoggedIn, profileUser)

export default route;