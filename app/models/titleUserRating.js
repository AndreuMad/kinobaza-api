const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModelName = require('../constants/modelNames').userModelName;
const titleModelName = require('../constants/modelNames').titleModelName;
const titleUserRatingModelName = require('../constants/modelNames').titleUserRatingModelName;

const TitleUserRatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: userModelName
    },
    title: {
        type: Schema.Types.ObjectId,
        ref: titleModelName
    },
    rating: Number
}, { collection: 'titleRating' });

module.exports = mongoose.model(titleUserRatingModelName, TitleUserRatingSchema);
