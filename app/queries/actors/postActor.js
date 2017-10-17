const Actor = require('../../models/person');

module.exports = (actorProps) => {
    const actor = new Actor(actorProps);

    return actor.save();
};
