const Title =  require('../../models/title');

module.exports = (titleProps) => {
    const title = new Title(titleProps);

    return title.save();
};
