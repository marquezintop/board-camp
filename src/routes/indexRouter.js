import { Router } from 'express'
import gamesRouter from './gamesRouter.js'
import customersRouter from './costumersRouter.js';
import rentalsRouter from './rentalsRouter.js';

const router = Router();

router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter)

export default router;