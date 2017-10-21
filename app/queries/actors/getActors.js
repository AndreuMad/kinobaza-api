const mongoose = require('mongoose');
const Actor = require('../../models/person');
const ObjectId = mongoose.Types.ObjectId;

module.exports = ({ userId, query, skip, limit }) => {

    return Actor.aggregate([
        {
            $match: query
        },
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
                name: {
                    en: '$root.name.en',
                    ukr: '$root.name.ukr'
                },
                image: {
                    url: '$root.image.url'
                },
                zodiacSign: '$root.zodiacSign',
                birthLocation: '$root.birthLocation',
                dateOfBirth: '$root.dateOfBirth',
                titles: '$root.titles'
            }
        },

        // Titles lookup
        {
            $lookup: {
                from: 'titles',
                localField: 'titles',
                foreignField: '_id',
                as: 'titles'
            }
        },
        {
            $unwind: {
                path: '$titles',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $sort: {
                'titles.year': -1
            }
        },
        {
            $project: {
                total: 1,
                name: 1,
                image: 1,
                zodiacSign: 1,
                birthLocation: 1,
                dateOfBirth: 1,
                titles: {
                    _id: 1,
                    image: 1,
                    name: 1
                }
            }
        },
        {
            $group: {
                _id: '$_id',
                total: { $first: '$total' },
                name: { $first: '$name' },
                image: { $first: '$image' },
                zodiacSign: { $first: '$zodiacSign' },
                birthLocation: { $first: '$birthLocation' },
                dateOfBirth: { $first: '$dateOfBirth' },
                titles: { $push: '$titles' }
            }
        },
        {
            $project: {
                total: 1,
                name: 1,
                image: 1,
                zodiacSign: 1,
                birthLocation: 1,
                dateOfBirth: 1,
                titlesNumber: { $size: '$titles' },
                titles: {
                    '$slice': ['$titles', 5]
                }
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        },

        // Likes
        {
            $lookup: {
                from : 'actorLikes',
                localField: '_id',
                foreignField: 'actor',
                as: 'likes'
            }
        },
        {
            $project: {
                total: 1,
                name: 1,
                image: 1,
                zodiacSign: 1,
                birthLocation: 1,
                dateOfBirth: 1,
                titlesNumber: 1,
                titles: 1,
                likes: { $filter: { input: '$likes', as: 'like', cond: { $eq: [ '$$like.user', ObjectId(userId) ] } } }
            }
        },
        {
            $unwind: {
                path: '$likes',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: null,
                likes: { $push: '$likes.actor' },
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
                total: '$root.total',
                likes: 1,
                _id: '$root._id',
                name: '$root.name',
                image: '$root.image',
                zodiacSign: '$root.zodiacSign',
                birthLocation: '$root.birthLocation',
                dateOfBirth: '$root.dateOfBirth',
                titlesNumber: '$root.titlesNumber',
                titles: '$root.titles'
            }
        }
    ])
};
