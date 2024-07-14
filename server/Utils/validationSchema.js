import Joi from 'joi';

export const userSchema = Joi.object({
    fullName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.base': `"Full Name" should be a type of 'text'`,
            'string.empty': `"Full Name" cannot be an empty field`,
            'string.min': `"Full Name" should have a minimum length of {#limit}`,
            'string.max': `"Full Name" should have a maximum length of {#limit}`,
            'any.required': `"Full Name" is a required field`
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': `"Email" must be a valid email`,
            'any.required': `"Email" is a required field`
        }),
    address: Joi.string()
        .min(10)
        .max(100)
        .required()
        .messages({
            'string.base': `"Address" should be a type of 'text'`,
            'string.empty': `"Address" cannot be an empty field`,
            'string.min': `"Address" should have a minimum length of {#limit}`,
            'string.max': `"Address" should have a maximum length of {#limit}`,
            'any.required': `"Address" is a required field`
        }),
    gender: Joi.string()
        .valid('male', 'female')
        .required()
        .messages({
            'any.only': `"Gender" must be one of ['male', 'female']`,
            'any.required': `"Gender" is a required field`
        }),
    dateOfBirth: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': `"Date of Birth" should be a valid date`,
            'date.isoDate': `"Date of Birth" should be in ISO format`,
            'any.required': `"Date of Birth" is a required field`
        }),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.pattern.base': `"Phone" must be a 10-digit number`,
            'any.required': `"Phone" is a required field`
        }),
    orders: Joi.array()
        .items(Joi.object()) // Leaving the orders validation for later
});
