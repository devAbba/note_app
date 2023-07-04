import Joi from "joi";

const UserAddSchema = Joi.object({
    first_name: Joi.string()
        .max(255)
        .trim()
        .required(),
    last_name: Joi.string()
        .max(255)
        .trim()
        .required(),
    username: Joi.string().allow('')
        .max(255)
        .trim()
        .optional(),
    email: Joi.string()
        .email()
        .min(5)
        .max(50)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(50)
        .required() 
})


const UpdateUserSchema = Joi.object({
    first_name: Joi.string()
        .max(255)
        .trim()
        .required(),
    last_name: Joi.string()
        .max(255)
        .trim()
        .required(),
    username: Joi.string().allow('')
        .max(255)
        .trim()
        .optional(),
        
    notes: Joi.array()
        .items(Joi.string()),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(50)
       .required() 
})


async function AddUserValidation(req: any, _res: any, next: Function) {
    const userPayLoad = req.body

    try {
        await UserAddSchema.validateAsync(userPayLoad)
        next()
    } catch (error: any) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

async function UpdateUserValidation(req: any, _res: any, next: Function) {
    const userPayLoad = req.body

    try {
        await UpdateUserSchema.validateAsync(userPayLoad)
        next()
    } catch (error: any) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

export default {
    AddUserValidation,
    UpdateUserValidation
}
