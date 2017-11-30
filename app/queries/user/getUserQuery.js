const User = require('../../models/user');

module.exports = (_id) => {
    return User.findById(_id)
        .select({_id: 1, avatar: 1, email: 1, name: 1, dateOfBirth: 1});
};