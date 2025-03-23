import express from 'express';
import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient()
const app= express()
const router = express.Router()

app.get('/auth/',async(req, res)=>{
    res.send('auth endpoint')
})



app.post('/auth/register', async(req, res)=>{
    const {email, password, name, role}=req.body;
    
    const user = await prisma.user.create({
        data:{email, password, name},

    });
    res.json(user)

})



export default router;