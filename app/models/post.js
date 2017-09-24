const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    image: {
        url: String
    },
    title: String,
    date: String,
    text: String,
    important: Boolean
});

module.exports = mongoose.model('Post', PostSchema);
