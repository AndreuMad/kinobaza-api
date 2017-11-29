const fs = require('fs-extra');

const pathImg = require('../constants/paths').pathImg;

const getImage = function(req, res) {
    const fileName = req.params.avatar;

    fs.readFile(`${pathImg}/users/avatars/${fileName}`)
        .then(file => {
            res
                .set({
                    'Content-Type': 'image/jpg'
                })
                .send(file);
        })
        .catch(error => {
            console.log(error);
            throw(error);
        });
};

module.exports = {
    getImage: getImage
};
