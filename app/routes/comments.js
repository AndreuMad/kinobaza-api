const Comment = require('../models/comment');

const postCommentQuery = require('../queries/comments/postCommentQuery');

const postComment = function(req, res) {
    const query = {
        user: req.body.user,
        date: new Date().getTime(),
        post: req.body.post,
        text: req.body.text
    };

    postCommentQuery(query)
        .then(comment => res.send(comment))
        .catch((error) => {
            res.send(error);
        });
};

module.exports = {
    postComment: postComment
};
