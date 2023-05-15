import { Router } from 'express'
import validateSchema from '../middlewares/validateSchema.js'
import rentalSchema from '../schemas/rentalSchema.js'
import { insertRental, getRentals } from '../controllers/rentals.js'

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', validateSchema(rentalSchema), insertRental);

export default rentalsRouter;