const ActorLike = require('../../models/actorLike');

module.exports = ({ userId, actorId }) => {
    return ActorLike.findOne({
        user: userId,
        actor: actorId
    })
        .then((like) => {
            if(like) {
                return like.remove()
                    .then(() => 'like removed');
            } else {
                const like = new ActorLike({
                    user: userId,
                    actor: actorId
                });

                return like.save()
                    .then(() => 'like saved');
            }
        })
        .catch(error => console.log(error));
};
