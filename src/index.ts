import express, {Express, Request, Response} from 'express'
import { PORT } from './secrets'
import rootRouter from './routes'
import { PrismaClient } from '@prisma/client';
import { registerSchema } from './schema/authSchema';
import { errorMiddleware } from './middlewares/advanceError';




export const prismaClient = new PrismaClient();


const app:Express = express();






app.use(express.json())
app.use('/', rootRouter)
app.use(errorMiddleware)




app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})