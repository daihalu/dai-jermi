const { validationResult, checkSchema, body } = require('express-validator/check');
const { pick, kebabCase } = require('lodash');

const catchErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array().map(e => pick(e, ['param', 'msg'])) });
    }
    next();
};

const checkCreatePost = checkSchema({
    title: {
        in: ['body'],
        isLength: {
            options: { min: 5 },
            errorMessage: 'must have at least 5 characters'
        }
    },
    content: {
        in: ['body'],
        custom: {
            options: (value) => {
                return value.split(' ').length > 100;
            },
            errorMessage: 'must contain at least 100 words'
        }
    },
    tags: {
        in: ['body'],
        customSanitizer: {
            options: (values) => {
                const isArray = Array.isArray(values);
                return isArray ? values.split(' ').map(e => kebabCase(e)) : values;
            }
        },
        custom: {
            options: (values) => {
                return values ? Array.isArray(values) : false;
            },
            errorMessage: 'must be an array'
        }
    }
});

const checkUpdatePost = checkSchema({
    title: {
        in: ['body'],
        custom: {
            options: (value) => {
                return value ? value.length >= 5 : true;
            },
            errorMessage: 'must have at least 5 characters'
        },
    },
    content: {
        in: ['body'],
        custom: {
            options: (value) => {
                return value ? value.split(' ').length > 100 : true;
            },
            errorMessage: 'must contain at least 100 words'
        }
    },
    tags: {
        in: ['body'],
        customSanitizer: {
            options: (values) => {
                const isArray = Array.isArray(values);
                return isArray ? values.split(' ').map(e => kebabCase(e)) : values;
            }
        },
        custom: {
            options: (values) => {
                return values ? Array.isArray(values) : true;
            },
            errorMessage: 'must be an array'
        }
    }
});

const checkApprovePost = body('approval')
    .isBoolean().withMessage('must be a boolean');

const checkSignUpSignIn = checkSchema({
    username: {
        in: ['body'],
        isLength: {
            options: { min: 3 },
            errorMessage: 'must have at least 3 characters'
        },
        isAlphanumeric: {
            errorMessage: 'can only contain characters from a-zA-Z0-9'
        }
    },
    password: {
        in: ['body'],
        isLength: {
            options: { min: 6 },
            errorMessage: 'must have at least 6 characters'
        },
        isAlphanumeric: {
            errorMessage: 'can only contain characters from a-zA-Z0-9'
        }
    }
});

const checkChangePassword = checkSchema({
    oldPassword: {
        in: ['body'],
        isLength: {
            options: { min: 6 },
            errorMessage: 'must have at least 6 characters'
        },
        isAlphanumeric: {
            errorMessage: 'can only contain characters from a-zA-Z0-9'
        }
    },
    newPassword: {
        in: ['body'],
        isLength: {
            options: { min: 6 },
            errorMessage: 'must have at least 6 characters'
        },
        isAlphanumeric: {
            errorMessage: 'can only contain characters from a-zA-Z0-9'
        }
    }
});

const checkChangeRole = body('role')
    .isIn(['admin', 'user']).withMessage('must be \'admin\' or \'user\'');

exports.createPost = [ checkCreatePost, catchErrors ];
exports.updatePost = [ checkUpdatePost, catchErrors ];
exports.approvePost = [ checkApprovePost, catchErrors ];
exports.signUpSignIn = [ checkSignUpSignIn, catchErrors ];
exports.changePassword = [ checkChangePassword, catchErrors ];
exports.changeRole = [ checkChangeRole, catchErrors ];
