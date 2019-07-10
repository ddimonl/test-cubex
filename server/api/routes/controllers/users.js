const mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports.getUserData = (req, res, next) => {
    console.log(req.payload)
    User.findById(req.payload.id).then((user) => {
        if (!user) {
            res.status(401).send({error: "Unauthorized"});
        }

        res.send({user: user.toAuthJSON()});
    }).catch(next);
};