import { Request, Response } from "express" 
import { prismaClient } from "../.."
import argon2 from 'argon2'
import { registerSchema, signinSchema} from "../../schema/authSchema"
import { z } from "zod";




//sign up

export const signup = async(req:Request,res:Response)=>{
  try {
    const validatedData = registerSchema.parse(req.body)


    const user = await prismaClient.user.findFirst({where: {email:validatedData.email}})

    if(user){

         res.status(400).json({
            error: 'user already exist'
            })
    }




    const hashedPassword = await argon2.hash(validatedData.password);

      const newUser = await prismaClient.user.create({
        data: {
            email: validatedData.email,
            password:hashedPassword,
            name: validatedData.name,
            role: validatedData.role,

        }
    })

    res.status(200).json({
      message:"user created"
    })
  } catch(error){
    if(error instanceof z.ZodError){
      res.status(400).json({
        error:"something went wrong"
      })
    }
  }
}
  




//login 

export var  login = async (req:Request, res:Response)=>{
  try{
    const validatedData= signinSchema.parse(req.body)
    const user = await prismaClient.user.findFirst({where:{email=validatedData.email}})
      if(user){
        const passwordVerify = await argon2.verify(user.password, validatedData.password)
          if(passwordVerify){
              res.status(200).json({
                  message:"login success"
      })
    }
    else{
      res.status(400).json({
        error:"nothing"
      })
    }

  }
  else{
    res.status(400).json({
      error:"invalid credentials"
    })
  }
  }catch(error){
    if(error intanceof z.ZodError){
      res.status(400).json({
        error:"error handled"
      })
    }
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
export const deleteUsers = async(req:Request, res:Response)=>{

  try{
    if(login){
    res.status(200).json({message: success})
  }catch(error){
    res.status(400).json({message:failed})

  }
  
}





















