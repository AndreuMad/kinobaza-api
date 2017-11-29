const fs = require('fs-extra');
const Jimp = require("jimp");

const editUserQuery = require('../queries/user/editUserQuery');
const pathImg = require('../constants/paths').pathImg;

const editUser = function (req, res) {
    const {userId, name, dateOfBirth} = req.body;
    const {photo} = req.files;

    const distPath = `${pathImg}/users/avatars/${userId}.jpg`;
    const tempPath = photo.path;

    Jimp.read(tempPath)
        .then(image => image.resize(256, Jimp.AUTO).write(distPath))
        .then(() => fs.remove(tempPath))
        .catch(err => {
            console.error(err);
        });
};

module.exports = {
    editUser: editUser
};

