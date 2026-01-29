import 'dotenv/config'; 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { User } from './models/user.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import router from './auth.js';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router)

// ✅ Use environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.get('/', (req,res) => {
    res.send("<h1>Welcome to JWT Authentication</h1>");
})

function authMiddleware(req, res, next) {
    try{
        const token = req.headers.authorization?.split(' ')[1]; 
        
        if(!token){
            return res.status(401).send({msg: "Token is not available"})  
        }
        const decode = jwt.verify(token, "This is for learning"); 
        req.user = decode;
        console.log("User verified")
        next();
    
    }catch(err) { 
        res.status(401).send({msg: "Invalid token"}) 
    }
}


app.get('/profile', authMiddleware, (req, res) => {
    console.log(req.header.token)
  res.send({
    msg: 'Protected data',
    user: req.user
  });
});



async function startServer() {
    try {
        // Connect to database FIRST
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("🛢️  Connected to Database");
        
        // THEN start server
        app.listen(PORT, () => {
            console.log(`🗄️  Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("⚠️ Failed to start:", error);
        process.exit(1);
    }
}

startServer();