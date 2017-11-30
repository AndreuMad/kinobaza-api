const jwt = require('jwt-simple');

const User = require('../models/user');
const config = require('../../config');

const getUserQuery = require('../queries/user/getUserQuery');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

const signup = function(req, res, next) {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    if(!email || !name || !password) {
        return res.status(422)
            .send({ error: "Please, fill all fields" });
    }

    User.findOne({
        email: email
    }, function(error, existingUer) {
        if(error) {
            return next(error);
        }

        if(existingUer) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        const user = new User({
            email: email,
            name: name,
            password: password
        });

        user.save(function(error) {
            if(error) {
                return next(error);
            }

            res.json({
                id: user._id,
                name: user.name,
                token: tokenForUser(user)
            });
        });
    });
};

const signin = function(req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({
        user: req.user,
        token: tokenForUser(req.user)
    });
};

const signToken = function(req, res, next) {
    res.send(req.user);
};

module.exports = {
    signup: signup,
    signin: signin,
    signToken: signToken
};
