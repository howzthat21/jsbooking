import express, {Express, Request, Response} from 'express'
import { PORT } from './secrets'
import rootRouter from './routes'
import { PrismaClient } from '@prisma/client';


export const prismaClient = new PrismaClient();


const app:Express = express();






app.use(express.json())
app.use('/api', rootRouter)





app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})