import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import CustomError from '../utils/CustomError';


/**
 * Middleware to validate request body against the provided Joi schema.
 * @param schema - Joi schema for validation.
 * @returns Middleware function.
 */
export const validateRequestBody = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if (error) {
            // If validation fails, send a 400 Bad Request error with details.
            next(new CustomError(400, `Validation error: ${error.details[0].message}`));
        } else {
            // If validation succeeds, proceed to the next middleware or route handler.
            next();
        }
    };
};
