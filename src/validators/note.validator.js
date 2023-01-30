const Joi = require('joi')
export const newNoteValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        color: Joi.string().min(3).optional(),
        archive: Joi.boolean().optional(),
        trash: Joi.boolean().optional(),
        userId: Joi.string().min(3).optional()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
        next(error);
    } else {
        req.validatedBody = value;
        next();
    }
};
