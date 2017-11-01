const getReviewsQuery = require('../queries/reviews/getReviews');

const getReviews = function(req, res) {
    const requestQuery = req.query;

    const limit = +requestQuery.limit || 3;
    const skip = +requestQuery.skip || 0;

    getReviewsQuery({ skip, limit })
        .then(result => {

            res.json({
                total: result[0].total,
                reviews: result
            })
        })
        .catch(error => res.send(error));
};

module.exports = {
    getReviews: getReviews
};
