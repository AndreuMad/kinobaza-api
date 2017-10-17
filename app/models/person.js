const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personModelName = require('../constants/modelNames').personModelName;

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
    birthLocation: String
}, { collection: personModelName.toLowerCase() });

module.exports = mongoose.model(personModelName, personSchema);
