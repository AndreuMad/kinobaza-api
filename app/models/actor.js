const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorModelName = require('../constants/modelNames').actorModelName;
const titleModelName = require('../constants/modelNames').titleModelName;
const postModelName = require('../constants/modelNames').titleModelName;

const actorSchema = new Schema({
    name: String,
    zodiacSign: String,
    birthLocation: String,
    titlesNumber: Number,
    relatedTitles: [
        {
            type: Schema.Types.ObjectId,
            ref: titleModelName
        }
    ],
    relatedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: postModelName
        }
    ]
});

