const mongoose = require('mongoose');
const Review = require('../../models/review');
const ObjectId = mongoose.Types.ObjectId;

module.exports = ({ skip, limit }) => {

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
                _id: '$root.id',
                author: '$root.author',
                title: '$root.title',
                date: '$root.date',
                score: '$root.score',
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
                text: 1,
                score: 1
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
