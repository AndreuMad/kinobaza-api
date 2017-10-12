const Title =  require('../../models/title');

module.exports = ({ query, skip, limit, sort }) => {
    console.log(sort);

    return Title.aggregate([
        {
            $match: query
        },
        {
            $sort: { [sort]: -1 }
        },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                minScore: { $min: '$score.imdb' },
                maxScore: { $max: '$score.imdb' },
                minYear: { $min: '$year' },
                maxYear: { $max: '$year' },
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
                minScore: 1,
                maxScore: 1,
                minYear: 1,
                maxYear: 1,
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
