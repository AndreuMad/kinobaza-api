const Actor = require('../../models/person');

module.exports = ({ query, skip, limit }) => {

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
        }
    ])
};
