const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModelName = require('../constants/modelNames').userModelName;
const actorModelName = require('../constants/modelNames').personModelName;
const actorLikeModelName = require('../constants/modelNames').actorLikeModelName;

const ActorLikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: userModelName
    },
    actor: {
        type: Schema.Types.ObjectId,
        ref: actorModelName
    }
}, { collection: 'actorLikes' });

module.exports = mongoose.model(actorLikeModelName, ActorLikeSchema);
