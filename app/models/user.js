const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userModelName = require('../constants/modelNames').userModelName;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        unique: true
    },
    password: String
});

UserSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(error, salt) {
        if(error) {
            return next(error);
        }

        bcrypt.hash(user.password, salt, null, function(error, hash) {
            if(error) {
                return next(error);
            }

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {
        if(error) {
            return callback(error);
        }

        callback(null, isMatch);
    });
};

module.exports = mongoose.model(userModelName, UserSchema);
