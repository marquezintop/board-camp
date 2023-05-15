import joi from 'joi';

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required().min(11),
    cpf: joi.string().required().max(11),
    birthday: joi.string().required()
})

export default customersSchema;