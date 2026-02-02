import * as authService from '../services/auth.service.js';
import { matchedData } from 'express-validator';
import {  RefreshToken } from '../models/refreshToken.js'
import cookieParser from 'cookie-parser';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';




export const createUser = async (req, res, next) => {
    try{
        const data = matchedData(req);
        const newUser = await authService.createUser(data);
        res.status(201).send(
            {
                user: newUser,
                msg: "user created"
            }
        )
    }catch(err){
        next(err);
    }
}

export const loginUser = async (req, res, next) => {
    try{
        const data = req.body;
        const user = await authService.loginUser(data);
        const accessToken = authService.generateAccessToken(user);
        const refreshToken = authService.generateRefreshToken(user);

       await RefreshToken.create({
            token: refreshToken,
            userId: user._id
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,      // JS cannot access (XSS protection)
            secure: false,       // true in HTTPS
            sameSite: 'strict',  // CSRF protection
            maxAge: 60 * 60 * 1000
        })
        res.status(200).send(
            {
                msg: "user login success",
                Token: accessToken
            }
        )
    }catch(err){
        next(err);
    }
}

export const refreshToken = async (req, res, next) => {
    try{
        const oldToken = req.cookies.refreshToken;
        console.log(oldToken)
        const isMatch = await RefreshToken.findOne({ token: oldToken });
        if (!isMatch) {
        throw new Error("Invalid refresh token");
        }
        const decode = jwt.verify(oldToken, process.env.JWT_REFRESH_SECRET);
        if(!decode) {
            throw new Error("Refresh token is edited")
        }
        const user = await User.findById(decode.id);

        const token = authService.generateAccessToken(user);
        return res.status(201).send({Token: token});
    }catch(err){
        next(err);
    }
}