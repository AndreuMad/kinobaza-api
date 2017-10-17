const Actor = require('../../models/person');

module.exports = ({ skip, limit }) => {

    return Actor.aggregate([
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
                image: {
                    url: '$root.image.url'
                },
                zodiacSign: '$root.zodiacSign',
                birthLocation: '$root.birthLocation'
            }
        }
    ])
};
