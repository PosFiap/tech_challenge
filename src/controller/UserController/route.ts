import { Router } from "express";
import { userController } from "./user.controller";

const router: Router = Router()

//Routes
router.get('/', userController.findAll);
router.post('/create', userController.create)

const UserRoute = router

export { UserRoute };