import express, {type Express, Request, Response} from 'express'
import { PORT } from './secrets'

import { PrismaClient } from '@prisma/client';
import { registerSchema } from './schema/authSchema';
import { errorMiddleware } from './middlewares/advanceError';
import authRoutes from './api/auth/authRouter';




export const prismaClient = new PrismaClient();


const app:Express = express();






app.use(express.json())
app.use('/api', authRoutes)
app.use(errorMiddleware)




app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})