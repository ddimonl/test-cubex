const mongoose = require('mongoose'),
    User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../../config/index').secret;

module.exports = (req, res, next) => {
    const { email, username, password } = req.body.user;

    User.findOne({ $or: [ { username }, { email } ] })
        .then((user) => {
            console.log(user);
            if(!user) {
                const err = { error : "User not found"};
                res.status(404).send(err);
            }
            bcrypt.compare(password, user.password)
                .then(result => {
                    if(result) {
                        jwt.sign({username: user.username, id: user.id}, secret, { expiresIn: '24h' },(err, token) => {
                            if(err) { console.log(err) }
                            res.send({
                                user: {
                                    username: user.username,
                                    token
                                }
                            });
                        });
                    } else {
                        const err = { error: "Wrong password" };
                        //err.status = 400;
                        res.status(400).send(err);
                    }
                })
                .catch(err => res.status(400).send(err))
        })
        .catch(err => next(err))
};