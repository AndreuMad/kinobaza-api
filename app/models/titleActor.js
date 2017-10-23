const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorModelName = require('../constants/modelNames').personModelName;
const titleModelName = require('../constants/modelNames').titleModelName;
const titleActorModelName = require('../constants/modelNames').titleActorModelName;

const TitleActorSchema = new Schema({
    title: {
        type: Schema.Types.ObjectId,
        ref: titleModelName
    },
    actor: {
        type: Schema.Types.ObjectId,
        ref: actorModelName
    }
}, { collection: 'titleActor' });

module.exports = mongoose.model(titleActorModelName, TitleActorSchema);
