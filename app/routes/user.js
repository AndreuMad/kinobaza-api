const fs = require('fs');
const pathImg = require('../constants/paths').pathImg;

const editUser = function(req, res) {
    const { userId, name, photo, dateOfBirth } = req.body;

    if(photo) {
        const base64Data = photo.replace(/^data:image\/jpeg;base64,/, '');
        const dir = `${pathImg}/users/avatars/${userId}.jpg`;

        fs.writeFile(dir, base64Data, 'base64', function(err) {
            console.log(err);
        });
    }
};

module.exports = {
    editUser: editUser
};

