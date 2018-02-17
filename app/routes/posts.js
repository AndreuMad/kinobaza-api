const postPostQuery = require('../queries/posts/postPost');
const getPostsQuery = require('../queries/posts/getPosts');
const getArticlePostQuery = require('../queries/posts/getArticlePost');
const getPostQuery = require('../queries/posts/getPost');
const editPostQuery = require('../queries/posts/editPost');
const deletePostQuery = require('../queries/posts/deletePost');

const postPost = function (req, res) {
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

const getPosts = function (req, res) {
  const limit = +req.query.limit || 10;
  const skip = +req.query.skip || 0;
  const shouldLoadArticle = req.query.shouldLoadArticle;

  getPostsQuery({ limit, skip })
    .then(posts => {
      if (posts.length) {
        const articlePost = posts.filter(post => post.important);
        const articlePostId = articlePost.length ? articlePost[0]._id : posts[0];

        if (shouldLoadArticle && articlePostId) {
          getArticlePostQuery(articlePostId)
            .then(res => res[0])
            .then((articlePostResult) => {
              const filteredPosts = posts.map(post => post._id.toString() === articlePostResult._id.toString() ? articlePostResult : post);
              res.json({
                posts: filteredPosts,
                count: posts[0].total
              });
            })
            .catch((error) => res.send(error));
        } else {
          res.json({
            posts: posts,
            count: posts[0].total
          });
        }
      }
    })
    .catch(error => res.send(error));
};

const getPost = function (req, res) {
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

const editPost = function (req, res) {
  editPostQuery(req.params.post_id, req.body)
    .then(() => res.json({ message: 'Post updated' }))
    .catch((error) => res.send(error));
};

const deletePost = function (req, res) {
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
