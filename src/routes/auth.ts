import { Router } from "express"
import { deleteUsers, login, signup, updateUsers } from "../controllers/auth/auth"



//import { login } from "../controllers/auth"
const authRoutes:Router = Router()
authRoutes.post('/signup', signup)
authRoutes.post('/login', login)
authRoutes.post('/update', updateUsers)
authRoutes.post('/delete', deleteUsers)



export default authRoutes
