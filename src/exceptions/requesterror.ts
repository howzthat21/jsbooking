import { HttpException, type ErrorCodes } from "./errorhandling"

export class BadRequestException extends HttpException {
    constructor(message:string, errorCode:ErrorCodes){
        super(message, errorCode, 400)

       



    }
}
