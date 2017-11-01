const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const titleModelName = require('../constants/modelNames').titleModelName;
const reviewModelName = require('../constants/modelNames').reviewModelName;
const userModelName = require('../constants/modelNames').userModelName;

const ReviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: userModelName
    },
    title: {
        type: Schema.Types.ObjectId,
        ref: titleModelName
    },
    date: Number,
    text: String
}, { collection: 'reviews' });

module.exports = mongoose.model(reviewModelName, ReviewSchema);
