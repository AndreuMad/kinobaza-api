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
            $lookup: {
                from: 'postComments',
                localField: '_id',
                foreignField: 'post',
                as: 'comments'
            }
        },
        {
            $unwind: {
                path: '$comments',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $sort: {
                'comments.date': -1
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'comments.user',
                foreignField: '_id',
                as: 'comments.user'
            }
        },
        {
            $project: {
                title: 1,
                date: 1,
                text: 1,
                textArticle: 1,
                image: 1,
                important: 1,
                comments: {
                    _id: 1,
                    user: { $arrayElemAt: ['$comments.user', 0] },
                    date: 1,
                    post: 1,
                    text: 1
                }
            }
        },
        {
            $group: {
                _id: '$_id',
                title: { $first: '$title' },
                date: { $first: '$date' },
                text: { $first: '$text' },
                textArticle: { $first: '$textArticle' },
                image: { $first: '$image' },
                important: { $first: '$important' },
                comments: { $push: '$comments' }
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                date: 1,
                text: 1,
                textArticle: 1,
                image: 1,
                important: 1,
                comments: { $filter: { input: '$comments', as: 'comment', cond: { $ne: ['$$comment', {} ] } } }
            }
        },
        {
            $project: {
                _id: 1,
                title: 1,
                date: 1,
                text: 1,
                textArticle: 1,
                image: 1,
                important: 1,
                comments: {
                    _id: 1,
                    user: {
                        _id: 1,
                        name: 1
                    },
                    date: 1,
                    text: 1
                }
            }
        }
    ])
};
