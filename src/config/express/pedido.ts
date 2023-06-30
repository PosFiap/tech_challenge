import { Router } from "express";

const router: Router = Router();

router.post('/', (req, res) => { res.sendStatus(204)});

export { router };