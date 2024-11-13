const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
    return [
        body('userName').isEmail().withMessage('userName should be valid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password should be atleast 5 characters')
    ]
}

// const validate = (req, res, next) => {

//     const errors = validationResult(req)
//     if (errors.isEmpty()) {
//         return next()
//     }

//     const extractedErrors = []
//     errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))


//     return res.status(404).send({ extractedErrors })

//     // const extractedErrors=[]
//     // errors.array().map(err=>extractedErrors.push({[err.path]:err.msg}))

// }

const validate = validations => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
           // console.log("hii")
            if (result.errors.length) break;

        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

module.exports = {
    userValidationRules, validate
}