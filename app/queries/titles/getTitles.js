const mongoose = require('mongoose');
const Title =  require('../../models/title');
const ObjectId = mongoose.Types.ObjectId;

module.exports = ({ userId, query, skip, limit, sort }) => {

    return Title.aggregate([
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
                year: '$root.year',
                text: '$root.text',
                score: {
                    imdb: '$root.score.imdb',
                    average: '$root.score.average'
                },
                image: {
                    url: '$root.image.url'
                },
                genre: '$root.genre',
                actors: '$root.actors'
            }
        },

        // Actors lookup
        {
            $lookup: {
                from: 'titleActor',
                localField: '_id',
                foreignField: 'title',
                as: 'actors'
            }
        },
        {
            $unwind: {
                path: '$actors',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: '$_id',
                total: { $first: '$total' },
                name: { $first: '$name' },
                year: { $first: '$year' },
                text: { $first: '$text' },
                score: { $first: '$score' },
                image: { $first: '$image' },
                genre: { $first: '$genre' },
                actors: { $push: '$actors.actor' }
            }
        },
        {
            $lookup: {
                from: 'persons',
                localField: 'actors',
                foreignField: '_id',
                as: 'actors'
            }
        },
        {
            $project: {
                total: 1,
                name: 1,
                year: 1,
                text: 1,
                score: 1,
                image: 1,
                genre: 1,
                actors: {
                    _id: 1,
                    image: 1,
                    name: 1
                }
            }
        },

        // Rating lookup
        {
            $lookup: {
                from: 'titleRating',
                localField: '_id',
                foreignField: 'title',
                as: 'userRating'
            }
        },
        {
            $project: {
                total: 1,
                name: 1,
                year: 1,
                text: 1,
                score: 1,
                image: 1,
                genre: 1,
                actors: 1,
                userRating: { $filter: { input: '$userRating', as: 'ratingItem', cond: { $eq: [ '$$ratingItem.user', ObjectId(userId) ] } } }
            }
        },
        {
            $project: {
                total: 1,
                name: 1,
                year: 1,
                text: 1,
                score: 1,
                image: 1,
                genre: 1,
                actors: 1,
                userRating: { $arrayElemAt: [ '$userRating', 0 ] }
            }
        },
        {
            $sort: {
                [sort]: -1,
                _id: 1
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
