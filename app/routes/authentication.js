const jwt = require('jwt-simple');

const User = require('../models/user');
const config = require('../../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

const signupPost = function(req, res, next) {
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
                token: tokenForUser(user)
            });
        });
    });
};

const signinPost = function(req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user) });
};

module.exports = {
    signupPost: signupPost,
    signinPost: signinPost
};
