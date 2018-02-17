const Post =  require('../../models/post');

module.exports = ({ limit, skip }) => {

    return Post.aggregate([
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
                title: '$root.title',
                date: '$root.date',
                image: {
                    url: '$root.image.url'
                },
                important: '$root.important'
            }
        }
    ]);
};
