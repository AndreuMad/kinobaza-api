const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../../config');

const credentialOptions = {
    usernameField: 'email'
};

// Create local strategy
const credentialLogin = new LocalStrategy(
    credentialOptions,
    function(email, password, done) {
        // Verify this email and passport
        User.findOne({ email: email }, function(error, user) {
            if(error) {
                return done(error);
            }

            if(!user) {
                return done(null, false);
            }

            // Compare passwords
            user.comparePassword(password, function(error, isMatch) {
                if(error) {
                    return done(error);
                }

                if(!isMatch) {
                    return done(null, false);
                }

                return done(null, user);
            });
        });
    }
);

// Create options for JWT Strategy
const tokenOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const tokenLogin = new JwtStrategy(tokenOptions, function(payload, done) {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that user
    // Otherwise, call done without a user object
    User.findById(payload.sub, function(error, user) {
        if(error) {
            return done(error, false);
        }

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

module.exports = {
    tokenLogin: tokenLogin,
    credentialLogin: credentialLogin
};
