const { validationResult, checkSchema, body } = require('express-validator/check');
const { pick } = require('lodash');

const catchErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array().map(e => pick(e, ['param', 'msg'])) });
  }
  next();
};

const checkGetPosts = checkSchema({
  page: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: 'must be greater than or equal to 1',
    },
  },
  pageSize: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 1 },
      errorMessage: 'must be greater than or equal to 1',
    },
  },
  year: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 2018, max: new Date().getFullYear() },
      errorMessage: 'is out of range',
    },
  },
  month: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 1, max: 12 },
      errorMessage: 'must be in range 1-12',
    },

  },
  date: {
    in: ['query'],
    optional: true,
    isInt: {
      options: { min: 1, max: 31 },
      errorMessage: 'must be in range 1-31',
    },
  },
});

const checkCreatePost = checkSchema({
  title: {
    in: ['body'],
    isLength: {
      options: { min: 5 },
      errorMessage: 'must have at least 5 characters',
    },
  },
  intro: {
    in: ['body'],
    custom: {
      options: value => value.split(' ').length > 5,
      errorMessage: 'must contain at least 5 words',
    },
  },
  content: {
    in: ['body'],
    custom: {
      options: value => value.split(' ').length > 100,
      errorMessage: 'must contain at least 100 words',
    },
  },
  tags: {
    in: ['body'],
    custom: {
      options: values => (values ? Array.isArray(values) : false),
      errorMessage: 'must be an array',
    },
  },
});

const checkUpdatePost = checkSchema({
  title: {
    in: ['body'],
    optional: true,
    isLength: {
      options: { min: 5 },
      errorMessage: 'must have at least 5 characters',
    },
  },
  intro: {
    in: ['body'],
    optional: true,
    custom: {
      options: value => (value ? value.split(' ').length > 5 : true),
      errorMessage: 'must contain at least 5 words',
    },
  },
  content: {
    in: ['body'],
    optional: true,
    custom: {
      options: value => (value ? value.split(' ').length > 100 : true),
      errorMessage: 'must contain at least 100 words',
    },
  },
  tags: {
    in: ['body'],
    optional: true,
    custom: {
      options: values => (values ? Array.isArray(values) : false),
      errorMessage: 'must be an array',
    },
  },
});

const checkChangePostStatus = body('status')
  .isIn(['editing', 'published']).withMessage('must be \'editing\' or \'published\'');

const checkSignUpSignIn = checkSchema({
  username: {
    in: ['body'],
    isLength: {
      options: { min: 3 },
      errorMessage: 'must have at least 3 characters',
    },
    isAlphanumeric: {
      errorMessage: 'can only contain characters from a-zA-Z0-9',
    },
  },
  password: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'must have at least 6 characters',
    },
    isAlphanumeric: {
      errorMessage: 'can only contain characters from a-zA-Z0-9',
    },
  },
});

const checkChangePassword = checkSchema({
  oldPassword: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'must have at least 6 characters',
    },
    isAlphanumeric: {
      errorMessage: 'can only contain characters from a-zA-Z0-9',
    },
  },
  newPassword: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'must have at least 6 characters',
    },
    isAlphanumeric: {
      errorMessage: 'can only contain characters from a-zA-Z0-9',
    },
  },
});

const checkChangeRole = body('role')
  .isIn(['admin', 'user']).withMessage('must be \'admin\' or \'user\'');

exports.getPosts = [checkGetPosts, catchErrors];
exports.createPost = [checkCreatePost, catchErrors];
exports.updatePost = [checkUpdatePost, catchErrors];
exports.changePostStatus = [checkChangePostStatus, catchErrors];
exports.signUpSignIn = [checkSignUpSignIn, catchErrors];
exports.changePassword = [checkChangePassword, catchErrors];
exports.changeRole = [checkChangeRole, catchErrors];
