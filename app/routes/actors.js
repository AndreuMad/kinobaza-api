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
            res.json({
                total: result.length ? result[0].total : 0,
                actors: result
            });
        })
        .catch(error => res.send(error));
};

module.exports = {
    postActor: postActor,
    getActors: getActors
};
