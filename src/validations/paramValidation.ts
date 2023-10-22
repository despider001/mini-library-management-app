import Joi from 'joi';

const id = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': '"id" should be a type of number',
        'number.integer': '"id" should be an integer',
        'number.positive': '"id" should be a positive number',
        'any.required': '"id" is required'
    })
});

const userIdAndBookId = Joi.object({
    userId: Joi.number().integer().positive().required().messages({
        'number.base': '"userId" should be a type of number',
        'number.integer': '"userId" should be an integer',
        'number.positive': '"userId" should be a positive number',
        'any.required': '"userId" is required'
    }),
    bookId: Joi.number().integer().positive().required().messages({
        'number.base': '"bookId" should be a type of number',
        'number.integer': '"bookId" should be an integer',
        'number.positive': '"bookId" should be a positive number',
        'any.required': '"bookId" is required'
    })
});


export const paramValidation = {
    userIdAndBookId,
    id
};
