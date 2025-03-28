import type {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AppError } from '../utils/appError';
import {jwtDecode} from 'jwt-decode'
import { testSecret } from '../api/auth/authService';






export interface AuthRequest extends Request {
    user?:{email: string}
}


export const authenticateUser = (req:AuthRequest, res:Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next()
    }

    const token = authHeader.split(' ')[1]

    
        const decoded = jwt.verify(token,testSecret) as { email: string}
        req.user = {email:decoded.email}
        next()
    
}