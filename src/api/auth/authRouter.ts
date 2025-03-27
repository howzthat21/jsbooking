import { Router } from "express"
import { z } from "zod"
import { LoginSchema } from "./authModel"
import { authController } from "./authController"

const authRoutes:Router = Router()
authRoutes.post('/login', authController.login)

export default authRoutes







