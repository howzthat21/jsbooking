import { Prisma, PrismaClient, } from "@prisma/client";

import { CourtSchema, type CourtDTO } from "./courtModel";
import { response, Request } from "express";

export class CourtService {
    private prisma: PrismaClient

    constructor(){
        this.prisma =  new PrismaClient()
    }

    async createCourt(
        creds: CourtDTO
    ){
        try{
        const validatedCreds = CourtSchema.parse(creds)

        const courtExist = await this.prisma.court.findUnique({where:{
            name:validatedCreds.name,
        }})
            if(!courtExist){
                const courtCreate = await this.prisma.court.create({
                    data: {
                        name: validatedCreds.name,
                        location:validatedCreds.location,
                        pricePerHour: validatedCreds.pricePerHour

                    }
                })
                if(courtCreate){
                    response.status(201).json({
                        message:"booking success"
                    })

                    

                }
            }
        }catch(ex){
            response.status(400)
            throw new Error('something went wront',)


        }


    }
}

