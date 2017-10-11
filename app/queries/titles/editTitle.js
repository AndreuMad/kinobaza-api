const Title =  require('../../models/title');

module.exports = (_id, titleProps) => {
    return Title.findByIdAndUpdate(_id, titleProps);
};
