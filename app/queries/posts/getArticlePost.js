const mongoose = require('mongoose');
const Post =  require('../../models/post');
const ObjectId = mongoose.Types.ObjectId;

module.exports = (id) => {
  return Post.aggregate([
    {
      $match: {
        _id: ObjectId(id)
      }
    },
    {
      $project: {
        title: 1,
        date: 1,
        text: 1,
        image: 1
      }
    },
    {
      $addFields: {
        articlePost: true
      }
    }
  ])
};
