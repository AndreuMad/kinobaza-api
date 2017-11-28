const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentModelName = require('../constants/modelNames').commentModelName;
const userModelName = require('../constants/modelNames').userModelName;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: userModelName,
    },
    date: Number,
    post: Schema.Types.ObjectId,
    text: String
}, { collection: 'postComments' });

module.exports = mongoose.model(commentModelName, commentSchema);
