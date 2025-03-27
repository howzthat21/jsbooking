import { Prisma, PrismaClient,type User } from "@prisma/client";
import argon2 from 'argon2'
import { BadRequestException } from "../../exceptions/requesterror";
import  {
    type LoginDTO, type UpdateDTO, type DeleteDTO, type RegisterDTO, LoginSchema, UpdateSchema,
    DeleteSchema, RegisterSchema
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
        creds: LoginDTO

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
                const passwordValidation = await argon2.verify(user.password, creds.password)
                if(passwordValidation){
                    return{
                        message:'login sucess',
                        user: {id:user.id, email: user.email}
                    }
                }
                

            }
        
    }
    public async update(
        creds:UpdateDTO

    ){
        

        const user = await this.prisma.user.findUnique({
            where:{id:creds.id}
        })

        if(user){
            const validatedCreds = UpdateSchema.parse(creds)

            const updateUser = await this.prisma.user.update({
                where:{id:creds.id},
                data:{name:validatedCreds.name, role: validatedCreds.role}

            })
            if(!updateUser){
                return {
                    message:'user not updated error occured'
                }
            }


            

        }   
        if(!user){
            return{
                message:'user not found'

            }
        }
        


    }
    public async delete(
        creds:DeleteDTO
    ){
        const validatedCreds = DeleteSchema.parse(creds)

        const userDelete = await this.prisma.user.delete({
            where:{id: validatedCreds.id}
        })
        if(!userDelete){
            return {
                message: 'error occured'
            }
        }


    }
    public async register(
        creds: RegisterDTO
    ){
        const validatedCreds = RegisterSchema.parse(creds)

        const userExist = await this.prisma.user.findUnique({
            where:{email:validatedCreds.email},

        })

        if(userExist){
            return {
                message: 'user already exists',
            }
        }
        if(!userExist){
            const hashedPassword = await argon2.hash(validatedCreds.password)
            const userRegister = await this.prisma.user.create({
                data: {
                    email:validatedCreds.email,
                    password:hashedPassword
                }
            })

            if(userRegister){
                return {
                    message: 'user has been registered'
                }
            }
        }



        
    

        
    
}
}

export const authService = new AuthService()

