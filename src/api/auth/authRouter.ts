import { Router } from "express"
import { z } from "zod"
import { LoginSchema } from "./authModel"
import { authController, AuthController } from "./authController"
import { authenticateUser } from "../../middlewares/authMiddleware"

const authRoutes:Router = Router()


authRoutes.post('/login', authenticateUser, authController.login)
authRoutes.post('/register',authController.register)
authRoutes.post('/update', authController.update)
authRoutes.post('/delete', authController.delete)
authRoutes.get('/profile', authenticateUser, authController.getUserProfile)


export default authRoutes







