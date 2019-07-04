const router = require('express').Router();
const signupController = require('./controllers/signup');
const loginController = require('./controllers/login');
const middleware = require('../utils/middleware');

router.post('/login',
    loginController
);

router.post('/signup',
    middleware.signupValidation,
    middleware.validate,
    middleware.checkUser,
    signupController
);

module.exports = router;