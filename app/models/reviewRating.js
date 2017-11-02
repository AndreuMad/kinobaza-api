const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModelName = require('../constants/modelNames').userModelName;
const reviewModelName = require('../constants/modelNames').reviewModelName;
const reviewUserRatingModelName = require('../constants/modelNames').reviewUserRatingModelName;

const ReviewRatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: userModelName
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: reviewModelName
    },
    isPositive: Number
}, { collection: 'reviewRating' });

module.exports = mongoose.model(reviewUserRatingModelName, ReviewRatingSchema);
