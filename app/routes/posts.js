const Post =  require('../models/post');

const postPostQuery = require('../queries/posts/postPost');
const getPostsQuery = require('../queries/posts/getPosts');
const getPostQuery = require('../queries/posts/getPost');
const editPostQuery = require('../queries/posts/editPost');
const deletePostQuery = require('../queries/posts/deletePost');

const postPost = function(req, res) {
    const query = {
        image: req.body.image,
        title: req.body.title,
        date: req.body.date,
        text: req.body.text
    };

    postPostQuery(query)
        .then(() => res.json({ message: 'Post created' }))
        .catch((error) => {
            res.send(error);
        });
};

const getPosts = function(req, res) {
    const limit = +req.query.limit || 10;
    const skip = +req.query.skip || 0;

    getPostsQuery({ limit, skip })
        .then(result => {
            if(result.length) {
                res.json({
                    posts: result,
                    count: result[0].total
                });
            }
        })
        .catch(error => res.send(error));
};

const getPost = function(req, res) {
    getPostQuery(req.params.post_id)
        .then((post) => {
            const content = post[0];
            let result = {};
            result.post = content;
            result.comments = content.comments;

            // if(Object.keys(content.comments[0]).length) {
            //     result.comments = content.comments;
            // }

            delete result.post.comments;

            res.json(result);
        })
        .catch((error) => {
            res.send(error);
        });
};

const editPost = function(req, res) {
    editPostQuery(req.params.post_id, req.body)
        .then(() => res.json({ message: 'Post updated' }))
        .catch((error) => res.send(error));
};

const deletePost = function(req, res) {
    deletePostQuery(req.params.post_id)
        .then(() => res.json({ message: 'Successfully deleted' }))
        .catch((error) => res.send(error));
};

module.exports = {
    postPost: postPost,
    getPosts: getPosts,
    getPost: getPost,
    editPost: editPost,
    deletePost: deletePost
};
