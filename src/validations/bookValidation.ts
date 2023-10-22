// bookValidation.ts
import Joi from 'joi';

const bookSchema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
        'string.base': 'Name should be a type of string.',
        'string.empty': 'Name cannot be an empty field.',
        'string.min': 'Name should have a minimum length of 3.',
        'string.max': 'Name should have a maximum length of 255.',
        'any.required': 'Name is a required field.'
    }),
    // score: Joi.number().precision(2).messages({
    //     'number.base': 'Score should be a type of number.',
    //     'number.precision': 'Score should have a maximum of 2 decimal places.'
    // })
});

const returnBookSchema = Joi.object({
    score: Joi.number().integer().min(1).max(10).required().messages({
        'number.base': 'Score should be a type of number.',
        'number.integer': 'Score should be an integer.',
        'number.min': 'Score should be at least 1.',
        'number.max': 'Score should be at most 10.',
        'any.required': 'Score is a required field for returning a book.'
    })
    // Add other necessary fields for returning a book if needed
});

export const bookValidation = {
    bookSchema,
    returnBookSchema
};
