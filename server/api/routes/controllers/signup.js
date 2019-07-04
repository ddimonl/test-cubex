const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secret = require('../../config').secret;

module.exports = (req, res, next) => {

    bcrypt.hash(req.body.user.password, saltRounds)
        .then(hashedPwd => {
            req.body.user.password = hashedPwd;
            const new_user = new User(req.body.user);
            new_user.save()
                .then(user => {
                    jwt.sign({username: user.username, id: user.id}, secret, { expiresIn: '24h' },(err, token) => {
                        if(err) { console.log(err) }
                        res.send({
                            user: {
                                username: user.username,
                                token
                            }
                        });
                    });
                })
                .catch(err => next(err));
        })
        .catch(err => { res.send(err) })
};