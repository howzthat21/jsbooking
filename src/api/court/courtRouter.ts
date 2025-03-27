import { Router } from "express";
import { courtController } from "./courtController"


const courtRoutes:Router = Router()

courtRoutes.post('/create', courtController.create)

export default courtRoutes