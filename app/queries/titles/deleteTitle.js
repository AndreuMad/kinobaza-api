const Title =  require('../../models/title');

module.exports = (_id) => {
    return Title.findByIdAndRemove(_id);
};
