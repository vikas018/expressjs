import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import db from './utils/db.js';

//import all routes
import userRoutes from "./routes/user.routes.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true,
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ['Content-Type', 'Authrization']
}));

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, URL: ${req.url}`);
  next()
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => res.send('Hello World!!!!!'));

app.get('/about', (req, res) => res.send("About Page"));

app.get('/products/:productId', (req, res) => {
  res.send(`Product ID: ${req.params.productId}`);
});

app.get('/data', (req, res) => {
  res.json( { message: 'Hello, world!' });
});

db(); //connect to db

//user routes
app.use("/api/v1/users/", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});