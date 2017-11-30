const fs = require('fs-extra');
const Jimp = require("jimp");

const getUserQuery = require('../queries/user/getUserQuery');
const editUserQuery = require('../queries/user/editUserQuery');
const pathImg = require('../constants/paths').pathImg;

const editUser = function (req, res) {
    const {_id, name, dateOfBirth} = req.body;
    const data = {};

    if(name) {
        data.name = name;
    }
    if(dateOfBirth) {
        data.dateOfBirth = dateOfBirth;
    }

    editUserQuery(_id, data)
        .then(() => getUserQuery(_id))
        .then((user) => res.json(user))
        .catch(err => {
            console.error(err);
        });
};

const loadAvatar = function (req, res) {
    const {_id} = req.body;
    const {photo} = req.files;

    const distPath = `${pathImg}/users/avatars/${_id}.jpg`;
    const tempPath = photo.path;

    Jimp.read(tempPath)
        .then(image => image.resize(256, Jimp.AUTO).write(distPath))
        .then(() => editUserQuery(_id, {avatar: distPath}))
        .then(() => fs.remove(tempPath))
        .then(() => getUserQuery(_id))
        .then((user) => res.json(user))
        .catch(err => {
            console.error(err);
        });
};

module.exports = {
    editUser: editUser,
    loadAvatar: loadAvatar
};

