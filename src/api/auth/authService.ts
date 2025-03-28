import { Prisma, PrismaClient,type User } from "@prisma/client";
import argon2 from 'argon2'
import { BadRequestException } from "../../exceptions/requesterror";
import  {
    type LoginDTO, type UpdateDTO, type DeleteDTO, type RegisterDTO, type UserDTO, LoginSchema, UpdateSchema,
    DeleteSchema, RegisterSchema,
    UserSchema
} from './authModel'

import { ErrorCodes } from "../../exceptions/errorhandling";
import { response, type Response } from "express";
import type { z } from "zod";
import jwt from 'jsonwebtoken'


import dotenv from 'dotenv'
import { jwtDecode } from "jwt-decode";
import test from "node:test";



export const testSecret:string = 'ohadajbcjsabc'






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
                response.status(400)
                return {
                    message:'failed'
                }
                
            }
            
                //testing
                const passwordValidation = await argon2.verify(user.password, creds.password)
                if(passwordValidation){
                    const token = jwt.sign({email:validatedCreds.email}, testSecret)
                    return{
                        message:'login sucess',
                        user: {id:user.id, email: user.email},
                        data: { token}
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
            response.status(400)
            return {
                message: 'user already exists',
                
            }
            
        }
        
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

        public async getUserProfile(
            creds:UserDTO
        ){
            const validatedCreds = UserSchema.parse(creds)
            const CheckUserProfile = await this.prisma.user.findUnique({
                where:{email:validatedCreds.email},
                select:{email:true, role:true}
            })
            if(CheckUserProfile){
                return{
                    user:{email:CheckUserProfile.email, role: CheckUserProfile.role}
                }

                

            }


            return{
                message:"status"
            }
        }



        
    

        
    
}


export const authService = new AuthService()

