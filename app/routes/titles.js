const getTitleQuery = require('../queries/titles/getTitle');
const getTitlesQuery = require('../queries/titles/getTitles');
const postTitleQuery = require('../queries/titles/postTitle');
const editTitleQuery = require('../queries/titles/editTitle');
const deleteTitleQuery = require('../queries/titles/deleteTitle');
const rateTitleQuery = require('../queries/titles/rateTitle');

const postTitle = function(req, res) {
    const requestBody = req.body;

    const query = {
        title: requestBody.title,
        genre: requestBody.genre,
        image: requestBody.image,
        year: requestBody.year,
        score: requestBody.score,
        text: requestBody.text
    };

    postTitleQuery(query)
        .then(() => res.json({ message: 'Title created' }))
        .catch(error => res.send(error));
};

const getTitles = function(req, res) {
    const requestQuery = req.query;

    const limit = +requestQuery.limit || 3;
    const skip = +requestQuery.skip || 0;

    const userId = requestQuery.userId;
    const name = requestQuery.name;
    const genre = requestQuery.genre;
    const year = requestQuery.year ? JSON.parse(req.query.year) : null;
    const score = requestQuery.score ? JSON.parse(req.query.score) : null;
    const sort = requestQuery.sort || null;

    let query = {};

    if(name) {
        query = Object.assign(
            {
                $or: [
                    { "name.en": { "$regex": name, "$options": "i" } },
                    { "name.ukr": { "$regex": name, "$options": "i" } }
                ]
            },
            query
        );
    }

    if(genre) {
        query.genre = { $all: genre };
    }

    if(year) {
        query.year = { $gt: year.min, $lt: year.max };
    }

    if(score) {
        query["score.imdb"] = { $gt: score.min, $lt: score.max };
    }

    getTitlesQuery({ userId, query, skip, limit, sort })
        .then(result => {

            res.json({
                count: result.length ? result[0].total : 0,
                titles: result
            });
        })
        .catch(error => res.send(error));
};

const getTitle = function(req, res) {
    getTitleQuery(req.params.title_id)
        .then(title => res.json(title))
        .catch(error => res.send(error));
};

const editTitle = function(req, res) {
    editTitleQuery(req.params.title_id, req.body)
        .then(() => res.json({ message: 'Title updated' }))
        .catch(error => res.send(error));
};

const deleteTitle = function(req, res) {
    deleteTitleQuery(req.params.title_id)
        .then(() => res.json({ message: 'Successfully deleted' }))
        .catch(error => res.send(error));
};

const rateTitle = function(req, res) {
    const { userId, titleId, rating } = req.body;

    rateTitleQuery(userId, titleId, rating)
        .then(response => res.send(response))
        .catch(error => res.send(error));
};

module.exports = {
    postTitle: postTitle,
    getTitles: getTitles,
    getTitle: getTitle,
    editTitle: editTitle,
    deleteTitle: deleteTitle,
    rateTitle: rateTitle
};
