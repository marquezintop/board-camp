import { Router } from 'express'
import validateSchema from '../middlewares/validateSchema.js'
import customersSchema from '../schemas/customersSchema.js'
import { insertNewCustomer, getCustomer, getCustomersList, updateCustomer } from '../controllers/customers.js'

const customersRouter = Router();

customersRouter.get('/customers', getCustomersList);
customersRouter.get('/customers/:id', getCustomer);
customersRouter.post('/customers', validateSchema(customersSchema), insertNewCustomer);
customersRouter.put('/customers/:id', validateSchema(customersSchema), updateCustomer);

export default customersRouter;