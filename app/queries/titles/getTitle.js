const Title =  require('../../models/title');

module.exports = (id) => {
    return Title.findById(id);
};
