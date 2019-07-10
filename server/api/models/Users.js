const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid']
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        //required: [true, "can't be blank"],
        min: [6, "too short password"]
    }
}, {timestamps: true});

UserSchema.methods.generateJWT = function() {
    return jwt.sign({
        id: this._id,
        username: this.username,
    }, secret,  { expiresIn: '24h' });
};

UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    };
};

mongoose.model('User', UserSchema);
