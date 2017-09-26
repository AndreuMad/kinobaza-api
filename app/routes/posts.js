const Post =  require('../models/post');

const postPost = function(req, res) {
    var post = new Post({
        image: req.body.image,
        title: req.body.title,
        date: req.body.date,
        text: req.body.text
    });

    post.save(function(err) {
        if(err) {
            res.send(err);
        }

        res.json({ message: 'Post created' });
    });
};

const getPosts = function(req, res) {
    var limit = +req.query.limit || 10;
    var skip = +req.query.skip || 0;

    var count;

    Post.count({})
        .exec(function(err, posts) {
            count = posts;
        });

    Post.find()
        .skip(skip)
        .limit(limit)
        .select([
            'id',
            'title',
            'image',
            'important'
        ])
        .exec(function(err, posts) {
            if(err) {
                res.send(err);
            }

            res.json({
                posts: posts,
                count: count
            });
        });
};

const getPost = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if(err) {
            res.send(err);
        }

        res.json(post);
    });
};

const putPost = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if(err) {
            res.send(err);
        }

        post.title = req.body.title;
        post.text = req.body.text;

        post.save(function(err) {
            if(err) {
                res.send(err);
            }
        });

        res.json({ message: 'Post updated' });
    });
};

const deletePost = function(req, res) {
    Post.remove({
        _id: req.params.post_id
    }, function(err, post) {
        if(err) {
            res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
};

module.exports = {
    postPost: postPost,
    getPosts: getPosts,
    getPost: getPost,
    putPost: putPost,
    deletePost: deletePost
};
