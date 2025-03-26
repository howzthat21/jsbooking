import { Request, Response, NextFunction} from "express" 
import { prismaClient } from "../..";
import argon2 from 'argon2';
import { registerSchema } from "../../schema/authSchema" 
import { ErrorCodes } from "../../exceptions/errorhandling";
import { BadRequestException } from "../../exceptions/requesterror";

//sign up

export const signup = async(req:Request,res:Response, next:NextFunction)=>{
    const validatedData = registerSchema.parse(req.body)
    
    
    let user = await prismaClient.user.findFirst({where: {email:validatedData.email}})

    if(user){
        next( new BadRequestException('user exist', ErrorCodes.USER_ALREADY_EXISTS))

        
    
        




    
    
 }
    const hashedPassword = await argon2.hash(validatedData.password);

    try{
    const newUser = await prismaClient.user.create({
        data: {
            email: validatedData.email,
            password:hashedPassword,
            name: validatedData.name,
            role: validatedData.role,

        }
    })
    }catch(error){

        res.status(400).json({
            error:"could not create user"
        })

    }
    
}

//login 

export const login = async(req:Request, res:Response)=>{
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where:{email}})

    if(!user){
         res.status(400).json({error:"invalid login"});
         return;
    }

    const passwordValidation = await argon2.verify(user.password, password);
    if(passwordValidation){
         res.status(200).json({message:"login success"})
    }
    else{
        res.status(400).json({error: "login failed"})
    }
}



//updating the user

export const updateUsers = async(req:Request, res:Response)=>{
    const {name, email, role, password}= req.body;

    const upsertUsers = await prismaClient.user.upsert({
        where:{email},
        create: {name, email, role, password},
        update:{name, role},

    })
    res.status(201).json({message:"information updated successfuly"})

}

//deleteusers
export const deleteUsers= async (req:Request, res:Response)=>{
    const {email}=req.body

    let user = await prismaClient.user.findFirst({where:{email}})
    
    if(!user){
        res.status(404).json({message:"user not found"})
    }


    const deleteUser = await prismaClient.user.delete({
        where:{email}
    })

    if(deleteUser){
        res.status(200).json({message:"user deleted"})
    }




}
