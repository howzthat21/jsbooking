import type { RequestHandler, Request, Response } from "express";
import { CourtService } from "./courtService";
import { CourtSchema } from "./courtModel";


const courtService = new CourtService();


export class CourtController {
    public create:RequestHandler = async(req:Request, res:Response)=>{
        const data = CourtSchema.parse(req.body)
        const serviceResponse = await courtService.createCourt(data)
        if(serviceResponse){
            res.json({
                message:"created",
                serviceResponse
            })
            
        }

    }
}