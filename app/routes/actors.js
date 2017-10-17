const postActorQuery = require('../queries/actors/postActor');
const getActorsQuery = require('../queries/actors/getActors');

const postActor = function(req, res) {

    const requestBody = req.body;
    const query = {
        name: requestBody.name,
        type: 'actor',
        image: requestBody.image,
        zodiacSign: requestBody.zodiacSign,
        birthLocation: requestBody.birthLocation
    };

    postActorQuery(query)
        .then(() => res.json({ message: 'Actor created' }))
        .catch(error => res.send(error));
};

const getActors = function(req, res) {
    const requestQuery = req.query;

    const limit = +requestQuery.limit || 3;
    const skip = +requestQuery.skip || 0;

    getActorsQuery({ skip, limit })
        .then(result => {
            if(result.length) {
                res.json({
                    count: result[0].total,
                    actors: result
                });
            } else {
                res.json({
                    count: 0,
                    titles: result
                })
            }
        })
};

module.exports = {
    postActor: postActor,
    getActors: getActors
};
