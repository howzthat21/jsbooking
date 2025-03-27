import { Prisma, PrismaClient,type User } from "@prisma/client";
import argon2 from 'argon2'
import { BadRequestException } from "../../exceptions/requesterror";





import  {
    LoginDTO, LoginSchema
} from './authModel'

import { ErrorCodes } from "../../exceptions/errorhandling";
import type { Response } from "express";
import type { z } from "zod";



export class AuthService {
    
    private prisma: PrismaClient

    constructor(){
        this.prisma=new PrismaClient()
    }

     async login(
        creds: z.infer<typeof LoginSchema>

    ){

            const validatedCreds = LoginSchema.parse(creds)
            //was working fine until npx prisma generate
        
            const user = await this.prisma.user.findUnique({
                where:{email: validatedCreds.email},
                select: { id:true, email:true, password:true}
            })
            

            if(!user || !user.password){
                throw new BadRequestException('invalid login',ErrorCodes.INCORRECT_PASSWORD)

                
            }
            if(user){
                //testing
                const passwordValidation = true;
                if(passwordValidation){
                    return{
                        message:'login sucess',
                        user: {id:user.id, email: user.email}
                    }
                }
                

            }
        
    }
}

export const authService = new AuthService()

