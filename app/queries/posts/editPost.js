const Post =  require('../../models/post');

module.exports = (_id, postProps) => {
    return Post.findByIdAndUpdate(_id, postProps);
};
