const Title =  require('../../models/title');

module.exports = (_id) => {
    return Title.findById(_id);
};
