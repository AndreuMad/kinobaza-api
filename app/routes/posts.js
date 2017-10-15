const Post =  require('../models/post');

const postPostQuery = require('../queries/posts/postPost');
const getPostsQuery = require('../queries/posts/getPosts');

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
            res.json({
                posts: result,
                count: result[0].total
            });
        })
        .catch(error => res.send(error));
};

const getPost = function(req, res) {
    Post.findById(req.params.post_id)
        .then((post) => {
            res.json(post);
        })
        .catch((error) => {
            res.send(error);
        });
};

const putPost = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if(err) {
            res.send(err);
        }

        post.title = req.body.title;
        post.text = req.body.text;

        post.save()
            .then(() => res.json({ message: 'Post updated' }))
            .catch((error) => res.send(error));
    })
};

const deletePost = function(req, res) {
    Post.remove({
        _id: req.params.post_id
    })
        .then(() => res.json({ message: 'Successfully deleted' }))
        .catch((error) => res.send(error));
};

module.exports = {
    postPost: postPost,
    getPosts: getPosts,
    getPost: getPost,
    putPost: putPost,
    deletePost: deletePost
};
