const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personModelName = require('../constants/modelNames').personModelName;
const titleModelName = require('../constants/modelNames').titleModelName;

const personSchema = new Schema({
    name: {
        ukr: String,
        en: String
    },
    type: String,
    image: {
        url: String
    },
    zodiacSign: String,
    birthLocation: String,
    titles: [{
        type: Schema.Types.ObjectId,
        ref: titleModelName
    }]
}, { collection: 'persons' });

module.exports = mongoose.model(personModelName, personSchema);
