// BASE SETUP
// =============================================================================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./app/routes/posts');
const titlesRoutes = require('./app/routes/titles');

// "C:\Program Files\MongoDB\Server\3.4\bin\mongod"

mongoose.connect('mongodb://localhost/kinobaza');

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
    .get(postsRoutes.getPosts)
    .post(postsRoutes.postPost);

// Single post
router.route('/posts/:post_id')
    .get(postsRoutes.getPost)
    .put(postsRoutes.putPost)
    .delete(postsRoutes.deletePost);

// Titles
router.route('/titles')
    .get(titlesRoutes.getTitle)
    .post(titlesRoutes.postTitle);

// Single title
router.route('/titles/:title_id')
    .get(titlesRoutes.getTitle)
    .put(titlesRoutes.putTitle)
    .delete(titlesRoutes.deleteTitle);

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port ' + port);
