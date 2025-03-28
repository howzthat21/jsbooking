import type { Request, RequestHandler, Response } from "express";
import { BookingSchema } from "./bookingModel";
import { BookingService } from "./bookingService";

const bookingService = new BookingService


export class BookingController {
    public :RequestHandler = async(req:Request, res:Response)=>{
        const data = BookingSchema.parse(req.body)
        const serviceResponse = await bookingService.createBooking(data)



    }
}