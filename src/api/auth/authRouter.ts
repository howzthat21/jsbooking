import { Router } from "express"
import { z } from "zod"
import { LoginSchema } from "./authModel"
import { authController, AuthController } from "./authController"

const authRoutes:Router = Router()


authRoutes.post('/login', authController.login)
authRoutes.post('/register',authController.register)
authRoutes.post('/update', authController.update)
authRoutes.post('/delete', authController.delete)


export default authRoutes







