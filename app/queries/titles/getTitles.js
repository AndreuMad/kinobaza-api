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
            $skip: skip
        },
        {
            $limit: limit
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
                genre: '$root.genre'
            }
        }
    ]);
};
