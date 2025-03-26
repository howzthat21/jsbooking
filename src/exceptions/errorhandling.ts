

export class HttpException extends Error{
    message: string;

    errorCode: ErrorCodes; 
    statusCode: number;
    
    

    constructor(message:string,errorCode:ErrorCodes, statusCode: number){
        super(message)
        this.message=message
        this.errorCode = errorCode
        this.statusCode = statusCode
        

    }








}
export enum ErrorCodes {
    USER_DOESNOT_EXIST=1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003
}

