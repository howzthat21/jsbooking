import type { Request, RequestHandler, Response } from "express";
import { LoginSchema, RegisterSchema } from "./authModel";
import { AuthService } from "./authService";


const authService = new AuthService();

export class AuthController{
        public login:RequestHandler = async (req:Request, res:Response)=>{
        const data = LoginSchema.parse(req.body)
        const serviceResponse = await authService.login(data)
        res.json({
            message:"process",
            serviceResponse
        })

    }
    //authentication not added yet
    public auth: RequestHandler = async(req:Request,res:Response)=>{
        
    }

    
}

export const authController = new AuthController()