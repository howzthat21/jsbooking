import { PrismaClient } from "@prisma/client"
import {  type BookingDTO, BookingSchema } from "./bookingModel"




export class BookingService {
    private prisma: PrismaClient
    
    constructor(){
        this.prisma = new PrismaClient()
    }

    async createBooking(
        creds:BookingDTO
    ){
        const validatedCreds = BookingSchema.parse(creds)
        
        const checkStatus = ()=>{
            if(validatedCreds.status==="AVAILABLE")
                return true
        }
        if(checkStatus()){
            console.log("this works")


        }


    }



}