const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TitleSchema = new Schema({
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
    text: String
});

module.exports = mongoose.model('Title', TitleSchema);
