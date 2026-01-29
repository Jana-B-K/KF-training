import { Router } from 'express';
import { User } from './models/user.js'
import { RefreshToken } from './models/refreshToken.js';
import { comparePassword, hashPassword } from './helper.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

// ✅ Use environment variables for secrets
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const router = Router();
router.use(cookieParser());


function generateAccessToken(userId){
    return jwt.sign(
        {userId},
        JWT_ACCESS_SECRET,
        {
            expiresIn: "30s",
        }
    );
}

function generateRefreshToken(userId){
    return jwt.sign(
        { userId },
        JWT_REFRESH_SECRET,
        {
            expiresIn: "3d"
        }
    )
}

router.post('/auth/register', async (req, res) => {
    let { name, email, password } = req.body;
    try{
        const isEmailAlReadyExist = await User.findOne({ email });
        if(isEmailAlReadyExist) {
            throw new Error("User already registered");
        }
        password = hashPassword(password);
        const newUser = await User.create(
            {
                name,
                email,
                password
            }
        )
        res.status(201).send({ msg: "User created "})
    }catch(err){
        return res.status(400).send(err.message)
    }
})

router.post('/auth/login', async (req, res ) => {
    const {  email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            throw new Error("email not registered");
        }
        const isPasswordMatch = comparePassword(password, user.password);
        if(!isPasswordMatch){
            throw new Error("password not matched");
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

         // Store refresh token in database
        await RefreshToken.create({
            token: refreshToken,
            userId: user._id
        });

        res .cookie("refreshToken", refreshToken, {
            httpOnly: true,      // JS cannot access (XSS protection)
            secure: false,       // true in HTTPS
            sameSite: 'strict',  // CSRF protection
            maxAge: 60 * 60 * 1000
        })
        return res.send({token: accessToken});
    }catch(err){
        res.status(404).send(err.message );
    }
})

router.get('/auth/refresh', async (req, res) => {
    const oldToken = req.cookies.refreshToken;
    if(!oldToken){
        res.send({msg: "No token available"});
    }
    try{
        const isMatched = await RefreshToken.findOne({token: oldToken});
        if(!isMatched){
            throw new Error("Invalid refresh token")
        }
        const payload = jwt.verify(oldToken, "This is for learning");
        if(!payload){
            throw new Error("Token is invalid");
        }
        const accessToken = generateAccessToken(payload.userId);
        res.status(200).send({token: accessToken});
    }catch(err){
        res.status(404).send(err.message );
    }
})

export default router;