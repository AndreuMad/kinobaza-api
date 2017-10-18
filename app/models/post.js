const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModelName = require('../constants/modelNames').postModelName;

const PostSchema = new Schema({
    image: {
        url: String
    },
    title: String,
    date: Number,
    text: String,
    textArticle: String,
    important: Boolean
});

module.exports = mongoose.model(postModelName, PostSchema);
