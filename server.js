const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');

const app = express();

const postsRoutes = require('./app/routes/posts');
const commentsRoutes = require('./app/routes/comments');
const titlesRoutes = require('./app/routes/titles');
const actorsRoutes = require('./app/routes/actors');
const reviewsRoutes = require('./app/routes/reviews');

const authentication = require('./app/routes/authentication');
const tokenLogin = require('./app/services/passport').tokenLogin;
const credentialLogin = require('./app/services/passport').credentialLogin;
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

passport.use(tokenLogin);
passport.use(credentialLogin);


// "C:\Program Files\MongoDB\Server\3.4\bin\mongod"

mongoose.connect('mongodb://localhost/kinobaza');
mongoose.Promise = global.Promise;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

const port = process.env.port || 8081;

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();

router.use(function(req, res, next) {
    //console.log('request was made');
    next();
});

router.route('/signin')
    .post(requireSignin, authentication.signin)
    .get(requireAuth, authentication.signToken);

router.route('/signup')
    .post(authentication.signup);

// Posts
router.route('/posts')
    .get(postsRoutes.getPosts)
    .post(postsRoutes.postPost);

// Single post
router.route('/posts/:post_id')
    .get(postsRoutes.getPost)
    .put(postsRoutes.editPost)
    .delete(postsRoutes.deletePost);

// Comments
router.route('/comments')
    .post(requireAuth, commentsRoutes.postComment);

// Titles
router.route('/titles')
    .get(titlesRoutes.getTitles)
    .post(titlesRoutes.postTitle);

// Single title
router.route('/titles/:title_id')
    .get(titlesRoutes.getTitle)
    .put(titlesRoutes.editTitle)
    .delete(titlesRoutes.deleteTitle);

router.route('/titles/rate')
    .post(titlesRoutes.rateTitle);

// Actors
router.route('/actors')
    .get(actorsRoutes.getActors)
    .post(actorsRoutes.postActor);

router.route('/actors/like')
    .post(actorsRoutes.postLike);

// Reviews
router.route('/reviews')
    .get(reviewsRoutes.getReviews);

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port ' + port);
