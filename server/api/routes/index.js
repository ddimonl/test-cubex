const router = require('express').Router();
const signupController = require('./controllers/signup');
const loginController = require('./controllers/login');
const middleware = require('../utils/middleware');
const auth = require('../utils/auth');
const userController = require('./controllers/users');

router.get('/user',
    auth.required,
    userController.getUserData
);

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