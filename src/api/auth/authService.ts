import { Prisma, PrismaClient,type User } from "@prisma/client";
import argon2 from 'argon2'
import { BadRequestException } from "../../exceptions/requesterror";





import type {
    LoginDTO
} from './authModel'

import { ErrorCodes } from "../../exceptions/errorhandling";
import type { Response } from "express";



export class AuthService {
    
    private prisma: PrismaClient

    constructor(){
        this.prisma=new PrismaClient()
    }

     async login(
        creds: LoginDTO, res:Response

    ){

            //was working fine until npx prisma generate
        
            const user = await this.prisma.user.findUnique({where:{email:creds.email}})
            

            if(!user || !user.password){
                throw new BadRequestException('invalid login',ErrorCodes.INCORRECT_PASSWORD)

                
            }
            if(user){
                //testing
                const passwordValidation = true;
                if(passwordValidation){
                    res.status(200).json({
                        message:"login success"
                    })
                }
                else{
                    throw new BadRequestException('password dont match', ErrorCodes.INCORRECT_PASSWORD)
                }

            }
        
    }
}

export const authService = new AuthService()

