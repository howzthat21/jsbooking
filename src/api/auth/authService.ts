import { Prisma, PrismaClient,type User } from "@prisma/client";
import argon2 from 'argon2'
import { BadRequestException } from "../../exceptions/requesterror";





import type {
    LoginDTO
} from './authModel'

import { ErrorCodes } from "../../exceptions/errorhandling";
import { response } from "express";

export class AuthService {
    static login(data: { email: string; password: string; }) {
        throw new Error("Method not implemented.");
    }
    private prisma: PrismaClient

    constructor(){
        this.prisma=new PrismaClient()
    }

     async login(
        creds: LoginDTO
    ){
        try{
            const user = await this.prisma.user.findUnique({where:{email:creds.email}})
            

            if(!user || !user.password){
                throw new BadRequestException('invalid login',ErrorCodes.INCORRECT_PASSWORD)

                
            }
            if(user){
                const passwordValidation = await argon2.verify(user.password, creds.password)
                if(passwordValidation){
                    response.status(200).json({
                        message:"login success"
                    })
                }
                else{
                    throw new BadRequestException('password dont match', ErrorCodes.INCORRECT_PASSWORD)
                }

            }
        }catch(exceptions){
            throw new BadRequestException('error',ErrorCodes.INCORRECT_PASSWORD)


        }
    }
}

