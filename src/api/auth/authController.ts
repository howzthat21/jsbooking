import type { Request, RequestHandler, Response } from "express";
import { LoginSchema, RegisterSchema, UpdateSchema, DeleteSchema } from "./authModel";
import { AuthService } from "./authService";
//import { error } from "console";


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

        public update: RequestHandler = async(req:Request, res:Response)=>{
            const data = UpdateSchema.parse(req.body)
            const serviceResponse = await authService.update(data)

            if(!serviceResponse){

                res.json({
                    message:"handled",
                    serviceResponse
                })
            }
            res.status(202).json({
                message: "user updated"
            })

            

        }
        public delete: RequestHandler = async (req:Request, res:Response)=>{
            const data = DeleteSchema.parse(req.body)
            const serviceResponse = await authService.delete(data)

            
            if(!serviceResponse){
                res.json({
                    message:'failed',
                    serviceResponse
                })
            }

            res.status(201).json({
                message:"user deleted"
            })
        }

        public register:RequestHandler = async (req:Request, res:Response)=>{
            const data = RegisterSchema.parse(req.body)
            const serviceResponse = await authService.register(data)


            if(!serviceResponse){
                res.json({
                    message:'failed'
                })
            }
            
            res.status(201).json({
                message: "user has been created"
            })
            
        }
        public getUserProfile: RequestHandler = async(req:Request,res:Response)=>{
            const data = LoginSchema.parse(req.body)
            const serviceResponse = await authService.getUserProfile(data)
        }

    
}

export const authController = new AuthController()