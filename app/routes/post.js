const Post =  require('../models/post');

const postsPost = function(req, res) {
    var post = new Post({
        title: req.body.title,
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

    Post.find()
        .skip(skip)
        .limit(limit)
        .select('title')
        .exec(function(err, posts) {
            if(err) {
                res.send(err);
            }

            res.json(posts);
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

module.exports = postsPost;
module.exports = getPosts;
module.exports = getPost;
module.exports = putPost;
module.exports = deletePost;
