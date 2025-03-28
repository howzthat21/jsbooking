export class AppError extends Error {
    statusCode:number
    status:string
    isOperational: boolean

    constructor(message: string ,statusCode:number, status:string, isOperational:boolean){
        super(message)
        this.statusCode = statusCode
        this.status = status
        this.isOperational = isOperational
        
        Error.captureStackTrace(this, this.constructor)
    }
}