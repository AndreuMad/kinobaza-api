const TitleUserRating = require('../../models/titleUserRating');

module.exports = (userId, titleId, rating) => {
    return TitleUserRating.findOne({
        user: userId,
        title: titleId
    })
        .then((userRatingItem) => {
            if(userRatingItem) {
                return userRatingItem.update({ rating })
                    .then(() => ({ action: 'edited', userRatingItem }));
            } else {
                const userRatingItem = new TitleUserRating({
                    user: userId,
                    title: titleId,
                    rating
                });

                return userRatingItem.save()
                    .then(() => ({ action: 'created', userRatingItem }));
            }
        })
        .catch(error => console.log(error));
};
