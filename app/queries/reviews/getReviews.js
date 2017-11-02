const mongoose = require('mongoose');
const Review = require('../../models/review');
const ObjectId = mongoose.Types.ObjectId;

module.exports = ({ userId, skip, limit }) => {

    return Review.aggregate([
        // Total adding
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                root: { $push: '$$ROOT' }
            }
        },
        {
            $unwind: {
                path: '$root',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                total: 1,
                _id: '$root._id',
                author: '$root.author',
                title: '$root.title',
                date: '$root.date',
                score: '$root.score',
                isPositive: '$root.isPositive',
                text: '$root.text'
            }
        },

        // Author, Title lookup
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }
        },
        {
            $lookup: {
                from: 'titles',
                localField: 'title',
                foreignField: '_id',
                as: 'title'
            }
        },
        {
            $project: {
                total: 1,
                author: {
                    _id: 1,
                    name: 1
                },
                title: {
                    _id: 1,
                    year: 1,
                    image: 1,
                    name: 1
                },
                date: 1,
                isPositive: 1,
                text: 1,
                score: 1
            }
        },
        {
            $project: {
                total: 1,
                author: { $arrayElemAt: [ '$author', 0 ] },
                title: { $arrayElemAt: [ '$title', 0 ] },
                date: 1,
                isPositive: 1,
                text: 1,
                score: 1
            }
        },

        // Rating Lookup
        {
            $lookup: {
                from: 'reviewRating',
                localField: '_id',
                foreignField: 'review',
                as: 'userRating'
            }
        },
        {
            $project: {
                total: 1,
                author: 1,
                title: 1,
                date: 1,
                isPositive: 1,
                text: 1,
                score: 1,
                userRating: 1,
                likes: {
                    positive: { $filter: { input: '$userRating', as: 'rate', cond: { $eq: [ '$$rate.isPositive', 1  ] } } },
                    negative: { $filter: { input: '$userRating', as: 'rate', cond: { $eq: [ '$$rate.isPositive', -1  ] } } }
                }
            }
        },
        {
            $project: {
                total: 1,
                author: 1,
                title: 1,
                date: 1,
                isPositive: 1,
                text: 1,
                score: 1,
                userRating: { $filter: { input: '$userRating', as: 'rate', cond: { $eq: [ '$$rate.user', ObjectId(userId) ] } } },
                likes: {
                    positive: { $size: '$likes.positive' },
                    negative: { $size: '$likes.negative' }
                }
            }
        },
        {
            $project: {
                total: 1,
                author: 1,
                title: 1,
                date: 1,
                isPositive: 1,
                text: 1,
                score: 1,
                likes: {
                    positive: 1,
                    negative: 1,
                    userLike: { $arrayElemAt: [ '$userRating', 0 ] }
                }
            }
        },
        {
            $project: {
                total: 1,
                author: 1,
                title: 1,
                date: 1,
                isPositive: 1,
                text: 1,
                score: 1,
                likes: {
                    positive: 1,
                    negative: 1,
                    userLike: '$likes.userLike.isPositive'
                }
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ]);
};
