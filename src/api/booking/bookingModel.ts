import { z } from "zod";

export const BookingSchema = z.object({
    userId:z.number(),
    courtId:z.string(),
    date:z.date(),
    startTime:z.date(),
    endTime:z.date(),
    status:z.enum(['AVAILABLE','PENDING','CONFIRMED','RESERVED']).default('PENDING'),

    bookingType:z.enum(['ONLINE','OFFLINE']).default('ONLINE'),
    


    



})

export type BookingDTO =z.infer<typeof BookingSchema>
