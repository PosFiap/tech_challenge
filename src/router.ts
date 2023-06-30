import { Router } from "express";
import { UserRoute } from "./controller/UserController/route";

const router: Router = Router()

//Routes
router.use('/user', UserRoute)

export { router };