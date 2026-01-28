import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { User } from './models/user.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
const app = express();


dotenv.config();
app.use(express.json());
app.use(cookieParser());


const PORT = 5000;

app.get('/', (req,res) => {
    res.send("<h1>Welcome to JWT Authentication<h1>");
})

app.post('/auth/register', async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const isEmailAllReadyExist = await User.findOne({ email: email});

        if( isEmailAllReadyExist ) {
            return res.status(400).send({ msg: "Email already exist"})
        }
        const newUser = await User.create({
            name,
            email,
            password
        })
        return res.status(201).send({user: newUser});
    }catch(err){
        console.log(err);
        res.status(400).send({msg: err.msg.toString() })
    }
})

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try{
        const isUserExist = await User.findOne({email: email});
        if(!isUserExist){
            return res.status(400).send({msg: "User not found"});

        }

        const isPassswordMatch = isUserExist.password === password;

        if(!isPassswordMatch){
            return res.status(404).send({ msg: "User password doesnot match"})
        }
        console.log(isUserExist._id)
        console.log(isUserExist.email)

        const token = jwt.sign(
            {_id: isUserExist._id, email: isUserExist.email},
            "This is secret",
            {
                expiresIn: "360s"
            }
        )
        console.log("token")
        res.cookie('token', token, {
            httpOnly: true,      // JS cannot access (XSS protection)
            secure: false,       // true in HTTPS
            sameSite: 'strict',  // CSRF protection
            maxAge: 60 * 60 * 1000
        });
        return res.send(
            {
                msg: "Login success",
                token: token
            }
        )
    }catch(err){
        res.status(500).send({ msg: "Internal server error" });

    }
})

app.get('/profile', authMiddleware, (req, res) => {
    console.log(req.header.token)
  res.send({
    msg: 'Protected data',
    user: req.user
  });
});

function authMiddleware(req, res, next) {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.send({msg: "Token is not avaialable"})
        }
        const decode = jwt.verify(token, "This is secret");
        req.user = decode;
        console.log("User verified")
        next();
    
    }catch(err) { 
        res.status(404).send({mes: "Invalid token"})
    }

}

app.listen(PORT, async () => {
    console.log(`🗄️  Server Fire on http://localhost:${PORT}`);
      try {
        await mongoose.connect(
        "mongodb+srv://janakumar9843_db_user:1234@cluster0.xspdewz.mongodb.net/?appName=Cluster0"
        );
        console.log("🛢️  Connected To Database");
    } catch (error) {
        console.log("⚠️ Error to connect Database");
    }
}) 