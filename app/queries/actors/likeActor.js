const ActorLike = require('../../models/actorLike');

module.exports = ({ userId, actorId }) => {
    return ActorLike.findOne({
        user: userId,
        actor: actorId
    })
        .then((like) => {
            if(like) {
                return like.remove()
                    .then(() => ({ action: 'removed', actorId }));
            } else {
                const like = new ActorLike({
                    user: userId,
                    actor: actorId
                });

                return like.save()
                    .then(() => ({ action: 'saved', actorId }));
            }
        })
        .catch(error => console.log(error));
};
