const User = require('../../models/user');

module.exports = (_id, userProps) => {
    return User.findByIdAndUpdate(_id, userProps);
};
