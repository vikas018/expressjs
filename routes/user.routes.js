import express from 'express';
import { register, verify, logIn } from '../controller/user.controller.js';

const route = express.Router();

route.post('/register', register)
route.get('/verify/:token', verify)
route.post('/login', logIn)

export default route;