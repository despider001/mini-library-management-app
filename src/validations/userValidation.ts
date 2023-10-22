import Joi from 'joi';

// Define the schema for validating user-related payloads
export const userSchema = Joi.object({
    name: Joi.string().required().min(2).max(50)
});


