const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const titleModelName = require('../constants/modelNames').titleModelName;
const personModelName = require('../constants/modelNames').personModelName;

const TitleSchema = new Schema({
    title: {
        en: String,
        ukr: String
    },
    genre: [{ type: String }],
    image: {
        url: String
    },
    year: Number,
    score: {
        imdb: Number,
        average: Number
    },
    text: String,
    actors: [{
        type: Schema.Types.ObjectId,
        ref: personModelName
    }]
});

module.exports = mongoose.model(titleModelName, TitleSchema);
