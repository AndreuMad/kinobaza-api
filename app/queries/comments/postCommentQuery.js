const Comment = require('../../models/comment');

module.exports = (commentProps) => {
    const comment = new Comment(commentProps);

    return comment.save()
        .then((comment) => {
            return Comment.populate(comment, { path: 'user' })
                .then(comment => comment)
        })
        .catch((error) => {
            throw(error);
        });
};
