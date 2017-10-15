const Post =  require('../../models/post');

module.exports = (postProps) => {
    const post = new Post(postProps);

    return post.save();
};
