import { Router } from "express";

const router: Router = Router()

router.use('/health', (req, res) => res.sendStatus(200));

export { router };