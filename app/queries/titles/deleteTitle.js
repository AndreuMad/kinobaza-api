const Title =  require('../../models/title');

module.exports = (id) => {
    return Title.findByIdAndRemove(id);
};
