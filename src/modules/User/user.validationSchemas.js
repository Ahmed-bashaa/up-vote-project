/**
 * Validation Modules
 * Joi
 * express-validator
 * zod
 * class-validator
 * 
 * Yup
*/

import Joi from 'joi';

// generate a custom rule for age field instead of using joi methods
const ageRule = (value, helper) => {
    if (value == 4) {
        return helper.message('age must be greater than 4')
        // return helper.error('any.invalid')
        // throw new Error('age must be greater than 4')
        // return undefined
    }
    return value
}
//===============================================================================================
export const signUpSchema = {
    body: Joi.object({
        username: Joi.string().min(2).max(10).alphanum().required().messages({
            'any.required': 'please enter your username'
        }),
        email: Joi.string().email({ tlds: { allow: ['com', 'org', 'yahoo'] }, minDomainSegments: 1 }).required(),
        password: Joi.string().required(),
        cpass: Joi.string().valid(Joi.ref('password')), // ensure that the cpass must be equal to password
        age: Joi.number().custom(ageRule), // to custom the rule
        // age: Joi.number().unsafe(), // allow any number regardless the Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER
        gender: Joi.string().valid('female', 'male'), // for enum values
        phone:Joi.string()
    })
        .with('password', 'cpass')  // ensure that if the password exists so the cpass must exist
        .with('email', 'password')  // ensure that if the email exists so the password must exist
}

// top level domain  => tlds such as .com , .org , .net , .io , .gov , .edu

export const SignInSchema={
    body:Joi.object({
        email: Joi.string().email({ tlds: { allow: ['com', 'org', 'yahoo'] }, minDomainSegments: 1 }).required(),
        password: Joi.string(),
    })
    .options({ presence: 'required' })  // apply .required() to all keys
    .with('email', 'password')  // ensure that if the email exists so the password must exist
}
//=========================================================================
export const ChangePasswordSchema={
body:Joi.object({
email: Joi.string().email({ tlds: { allow: ['com', 'org', 'yahoo'] }, minDomainSegments: 1 }).required(),
new_password :Joi.string().required(),
old_password :Joi.string().required(),


}),
headers:Joi.object({
    _id:Joi.string().hex().length(24)    

})

}
//==============================================================================================
export const UpdateAccountSchema ={
    body:Joi.object({
        username: Joi.string().min(2).max(10).alphanum().required().messages({
            'any.required': 'please enter your username'
        }),
        email: Joi.string().email({ tlds: { allow: ['com', 'org', 'yahoo'] }, minDomainSegments: 1 }).required(),
        age: Joi.number().custom(ageRule), // to custom the rule
    }),
    headers:Joi.object({
        _id:Joi.string().hex().length(24)    
    
    })
}
//==========================================================================================
export const deleteAccountSchema={
    headers:Joi.object({
        _id:Joi.string().hex().length(24)
    
    })
}
//=============================================================================================
export const deleteSoftSchema={
    headers:Joi.object({
        _id:Joi.string().hex().length(24)    
    })
}








