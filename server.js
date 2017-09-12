// BASE SETUP
// =============================================================================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./app/models/post');

mongoose.connect('mongodb://localhost/restfull-api');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.port || 8081;

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

router.use(function(req, res, next) {
    console.log('request was made');
    next();
});

// Posts
router.route('/posts')
    .post(function(req, res) {
        var post = new Post({
            title:req.body.title,
            text:req.body.text
        });

        post.save(function(err) {
            if(err) {
                res.send(err);
            }

            res.json({ message: 'Post created' });
        });
    })
    .get(function(req, res) {
        Post.find(function(err, posts) {
            if(err) {
                res.send(err);
            }

            res.json(posts);
        })
    });

// Single post
router.route('/posts/:post_id')
    .get(function(req, res) {
        Post.findById(req.params.post_id, function(err, post) {
            if(err) {
                res.send(err);
            }

            res.json(post);
        });
    })
    .put(function(req, res) {
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
    })
    .delete(function(req, res) {
        Post.remove({
            _id: req.params.post_id
        }, function(err, post) {
            if(err) {
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port ' + port);
