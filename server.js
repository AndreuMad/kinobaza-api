// BASE SETUP
// =============================================================================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./app/models/post');

const postsPost = require('./app/routes/post');
const getPosts = require('./app/routes/post');
const getPost = require('./app/routes/post');
const putPost = require('./app/routes/post');
const deletePost = require('./app/routes/post');

// "C:\Program Files\MongoDB\Server\3.4\bin\mongod"

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
    .post(postsPost)
    .get(getPosts);

// Single post
router.route('/posts/:post_id')
    .get(getPost)
    .put(putPost)
    .delete(deletePost);

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port ' + port);
