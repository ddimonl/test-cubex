const jwt = require('express-jwt');
const secret = require('../config').secret;

getTokenFromHeader = (req) => {
    const { authorization } = req.headers;
    console.log(req.headers);
    if (authorization && authorization.split(' ')[0] === 'Token' ||
        authorization && authorization.split(' ')[0] === 'Bearer') {
        return authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: secret,
        userProperty: 'payload',
        getToken: getTokenFromHeader
    }),
    optional: jwt({
        secret: secret,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
};

module.exports = auth;