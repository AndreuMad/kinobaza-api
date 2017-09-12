const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PostSchema = new Schema({
    id: Number,
    title: String,
    text: String
});

module.exports = mongoose.model('Post', PostSchema);
