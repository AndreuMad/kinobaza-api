const Post =  require('../../models/post');

module.exports = (id) => {
    return Post.findByIdAndRemove(id);
};
