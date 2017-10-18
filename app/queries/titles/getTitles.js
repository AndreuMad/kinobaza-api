const Title =  require('../../models/title');

module.exports = ({ query, skip, limit, sort }) => {

    return Title.aggregate([
        {
            $match: query
        },
        {
            $sort: { [sort]: 1 }
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
        {
            $lookup: {
                from: 'persons',
                localField: 'actors',
                foreignField: '_id',
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
                actors: { $push: '$actors' }
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
