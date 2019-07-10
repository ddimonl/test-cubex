const mongoose = require('mongoose');
const User = mongoose.model('User');

const { validationResult, check } = require('express-validator/check');

module.exports.signupValidation = [
    check("user.email")
        .isEmail().withMessage("Incorrect email"),
    check("user.username")
        .matches(/^[a-zA-Z0-9]+$/).withMessage('Incorrect username'),
    check("user.password")
        .isLength({ min: 6 }).withMessage('Password must be at least 6 chars long')
];

module.exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array();
        res.status(409).send({ error: err })
    }
    next();
};

module.exports.checkUser = (req, res, next) => {
    const { email } = req.body.user;
    User.findOne({ email })
        .then((user) => {
            //res.send(user);
            if(user) {
                const err = {error :[{ msg: "User already exists. Change your email", code: 409 }]};
                res.status(409).send(err);
            }
            next();
        })
        .catch(err => { res.send(err) })
};