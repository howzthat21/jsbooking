import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets'

const secret = JWT_SECRET

export const signToken = (id:number):string=>{
    return jwt.sign({id}, secret)
}
