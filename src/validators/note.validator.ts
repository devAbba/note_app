import Joi from "joi";

const NoteAddSchema = Joi.object({
    author: Joi.string()
        .optional(),
    title: Joi.string()
        .min(5)
        .max(255)
        .trim()
        .required(),
    body: Joi.string()
        .min(10)
        .required(),
    slug: Joi.string()
        .optional(),
    sanitizedHtml: Joi.string()
        .optional(),
    createdAt: Joi.date()
        .default(Date.now),
    updatedAt: Joi.date()
        .default(Date.now)   
})


const UpdateNoteSchema = Joi.object({
    title: Joi.string()
        .min(5)
        .max(255)
        .trim()
        .optional(),
    body: Joi.string()
        .min(10)
        .required(),
    slug: Joi.string()
        .optional(),
    sanitizedHtml: Joi.string()
        .optional(),
    updatedAt: Joi.date()
        .default(Date.now),   
})


async function AddNoteValidation(req: any, _res: any, next: Function) {
    const notePayLoad = req.body

    try {
        await NoteAddSchema.validateAsync(notePayLoad)
        next()
    } catch (error: any) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

async function UpdateNoteValidation(req: any, _res: any, next: Function) {
    const notePayLoad = req.body

    try {
        await UpdateNoteSchema.validateAsync(notePayLoad)
        next()
    } catch (error: any) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

export default {
    AddNoteValidation,
    UpdateNoteValidation
}
